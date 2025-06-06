import { io } from "socket.io-client";
import { get_token_io } from "./get_token";
class Socket {
  constructor() {}
  async initialize() {
    try {
      const token = await get_token_io();
      if (token.status === 200) {
        this.socket = io(process.env.REACT_APP_IO_URL, {
          withCredentials: true,
          "force new connection": true,
        });
        console.log("connect socket success");
      }
    } catch (err) {
      console.log(err.response);
    }
  }
  handle_new_message(callback) {
    if (!this.socket) return;
    this.socket.on("receive message", (msg_data) => {
      callback(msg_data);
    });
  }
  handle_load_all_message_in_room(callback) {
    if (!this.socket) return;
    this.socket.on("load all message in room", (msg_data, user_id) => {
      callback(msg_data, user_id);
    });
  }
  handle_disconnect(callback) {
    if (!this.socket) return;
    this.socket.on("disconnect", () => {
      callback();
    });
  }
  handle_get_list_conversations_at_home(callback) {
    if (!this.socket) return;
    this.socket.on("get list conversations at home", (data) => {
      callback(data);
    });
  }
  handle_notification(callback) {
    if (!this.socket) return;
    this.socket.on("notification", (fullname, message) => {
      callback(fullname, message);
    });
  }
  handle_room(conversation_id) {
    if (!this.socket) return;
    this.socket.emit("room", conversation_id);
    console.log("join room");
  }
  handle_account_logged_another_device(callback) {
    if (!this.socket) return;
    this.socket.on("account logged in another device", () => {
      callback();
    });
  }
  handle_error(callback) {
    if (!this.socket) return;
    this.socket.on("error", (message) => {
      callback(message);
    });
  }
  req_join_rom(conversation) {
    if (!this.socket) return;
    this.socket.emit("room", conversation);
  }
  req_send_message(fullname, message) {
    if (!this.socket) return;
    this.socket.emit("send message", fullname, message);
  }
  req_leave_room(callback) {
    if (!this.socket) return;
    this.socket.emit("leave room");
    callback();
  }
}
export default Socket;
