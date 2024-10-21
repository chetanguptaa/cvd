"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [isServerReady, setIsServerReady] = useState(false);

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
    // @ts-expect-error TODO -> change the type from unknown
    if (lastJsonMessage && lastJsonMessage.type === "SERVER_READY") {
      setIsServerReady(true);
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    if (isServerReady && readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: "JOIN_GAME",
        payload: {
          gameId: props.gameId,
        },
      });
    }
  }, [isServerReady, readyState, sendJsonMessage, props.gameId]);

  useEffect(() => {
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
