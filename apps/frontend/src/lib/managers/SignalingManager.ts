/* eslint-disable @typescript-eslint/no-explicit-any */

export const BASE_WEBSOCKET_URL = "ws://localhost:8080";

export class SignalingManager {
  private ws: WebSocket;
  private static instance: SignalingManager;
  private bufferedMessages: any[] = [];
  private callbacks: any = {};
  private initialized: boolean = false;

  private constructor() {
    this.ws = new WebSocket(BASE_WEBSOCKET_URL);
    this.bufferedMessages = [];
    this.init();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new SignalingManager();
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
      const type = message.data.t;
      if (this.callbacks[type]) {
        this.callbacks[type].forEach(({ callback }: any) => {
          if (type === "JOIN_GAME") {
            if (message.e) return; // returning for now we'll handle it later
            const user: Partial<{
              name: string;
              id: string;
              isGuest: boolean;
            }> = {
              id: message.u.i,
              name: message.u.n,
              isGuest: message.u.ig,
            };
            callback(user);
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
