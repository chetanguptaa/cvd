"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export default function Lobby(props: {
  user?: {
    id: string;
    name: string;
    createdAt: Date;
  };
  gameId: string;
  token?: string;
}) {
  const WS_URL = `ws://localhost:8080`;
  const router = useRouter();
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: true,
      queryParams: {
        token: props.token || "",
      },
    }
  );

  useEffect(() => {
    if (readyState !== ReadyState.OPEN) return;
    sendJsonMessage({
      type: "JOIN_GAME",
      payload: {
        gameId: props.gameId,
      },
    });
    return () => {
      sendJsonMessage({
        type: "LEAVE_GAME",
        payload: {
          gameId: props.gameId,
        },
      });
    };
  }, [props.gameId, readyState, sendJsonMessage]);

  useEffect(() => {
    if (!props.user || !props.token) {
      router.push("/");
    }
  }, [props.token, props.user, router]);

  return (
    <div>
      {JSON.stringify(props.user, null, 2)}
      {"last message " + lastJsonMessage}
    </div>
  );
}
