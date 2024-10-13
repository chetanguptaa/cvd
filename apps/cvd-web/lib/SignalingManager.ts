/* eslint-disable @typescript-eslint/no-explicit-any */
const WEBSOCKET_URL = "ws://localhost:8080";

export default class SignalingManager {
  private ws: WebSocket;
  private static instance: SignalingManager;
  private bufferedMessages: any[] = [];
  private callbacks: any;
  private initialized: boolean = false;

  private constructor(token?: string) {
    this.ws = new WebSocket(WEBSOCKET_URL + "?token=" + token);
    this.bufferedMessages = [];
    this.callbacks = new Map<string, any>();
    this.init();
  }
  public static getInstance(token?: string) {
    if (!this.instance) {
      this.instance = new SignalingManager(token);
    }
    return this.instance;
  }
  init() {
    this.ws.onopen = () => {
      this.initialized = true;
      this.bufferedMessages.forEach((message) => {
        this.ws.send(JSON.stringify(message));
      });
      this.bufferedMessages = [];
    };
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const type = message.t;
      if (type === "AUTH") {
        return;
      }
      if (this.callbacks.get(type)) {
        this.callbacks.get(type)?.forEach(({ callback }: any) => {
          if (type === "JOIN_GAME") {
            if (message.u) {
              const id = message.u.id;
              const name = message.u.name;
              callback(
                {
                  id,
                  name,
                },
                message.m
              );
            }
            if (message.e) {
              callback({
                error: message.e,
              });
            }
          }
        });
      }
    };
  }

  sendMessage(message: any) {
    const messageToSend = {
      ...message,
    };
    if (!this.initialized) {
      this.bufferedMessages.push(messageToSend);
      return;
    }
    this.ws.send(JSON.stringify(messageToSend));
  }

  async registerCallback(type: string, callback: any, id: string) {
    this.callbacks[type] = this.callbacks[type] || [];
    this.callbacks[type].push({ callback, id });
  }

  async deRegisterCallback(type: string, id: string) {
    if (this.callbacks[type]) {
      const index = this.callbacks[type].findIndex(
        (callback: any) => callback.id === id
      );
      if (index !== -1) {
        this.callbacks[type].splice(index, 1);
      }
    }
  }
}
