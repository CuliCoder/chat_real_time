const fs = require("fs");
const path = require("path");

const target = path.join(
  __dirname,
  "..",
  "node_modules",
  "buffer-equal-constant-time",
  "index.js"
);

if (!fs.existsSync(target)) {
  console.log("[patch-buffer-equal] target not found, skipping.");
  process.exit(0);
}

let source = fs.readFileSync(target, "utf8");

if (source.includes("SlowBuffer && SlowBuffer.prototype")) {
  console.log("[patch-buffer-equal] already patched.");
  process.exit(0);
}

const installBlock =
  "Buffer.prototype.equal = SlowBuffer.prototype.equal = function equal(that) {\n    return bufferEq(this, that);\n  };";

if (!source.includes(installBlock)) {
  console.log("[patch-buffer-equal] expected content not found, skipping.");
  process.exit(0);
}

source = source.replace(
  installBlock,
  "Buffer.prototype.equal = function equal(that) {\n    return bufferEq(this, that);\n  };\n\n  if (SlowBuffer && SlowBuffer.prototype) {\n    SlowBuffer.prototype.equal = function equal(that) {\n      return bufferEq(this, that);\n    };\n  }"
);

source = source.replace(
  "var origSlowBufEqual = SlowBuffer.prototype.equal;",
  "var origSlowBufEqual = SlowBuffer && SlowBuffer.prototype ? SlowBuffer.prototype.equal : undefined;"
);

source = source.replace(
  "  SlowBuffer.prototype.equal = origSlowBufEqual;",
  "  if (SlowBuffer && SlowBuffer.prototype) {\n    SlowBuffer.prototype.equal = origSlowBufEqual;\n  }"
);

fs.writeFileSync(target, source, "utf8");
console.log("[patch-buffer-equal] patched successfully.");
