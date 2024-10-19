import { useEffect, useState } from "react";

export const useSocket = (token: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080?token=${token}`);
    ws.onopen = () => {
      setSocket(ws);
    };
    ws.onclose = () => {
      setSocket(null);
    };
    return () => {
      ws.close();
    };
  }, [token]);
  return socket;
};
