import { useEffect, useState } from "react";

const WS_URL = "ws://localhost:8080";

export const useSocket = (user: {
  id: string;
  name: string;
  isGuest: boolean;
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  let token: string | null;
  if (user.isGuest) {
    token = localStorage.getItem("guest_auth_token") || "";
  } else {
    token = localStorage.getItem("auth_token") || "";
  }

  useEffect(() => {
    if (!user) return;
    if (user) {
      const ws = new WebSocket(`${WS_URL}?token=${token}`);
      ws.onopen = () => {
        setSocket(ws);
      };
      ws.onclose = () => {
        setSocket(null);
      };
      return () => {
        ws.close();
      };
    }
  }, [token, user]);

  return socket;
};
