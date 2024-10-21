"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Bubble from "./bubble";

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
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [timer, setTimer] = useState(30);

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
    if (lastJsonMessage) {
      const message = lastJsonMessage as {
        t: string;
        u: { i: string; n: string };
        e?: string;
        timeLeft?: number;
      };
      if (message.t === "JOIN_GAME" && !message.e && message.u) {
        setUsers((prevUsers) => [
          ...prevUsers,
          { id: message.u.i, name: message.u.n },
        ]);
      } else if (message.t === "LEAVE_GAME" && !message.e && message.u) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== message.u.i)
        );
      } else if (message.t === "COUNTDOWN" && !message.e && message.timeLeft) {
        setTimer(message.timeLeft);
      } else if (message.t === "GAME_STARTED" && !message.e) {
        router.push("/game/" + props.gameId + "/game");
      }
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
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center h-[75vh]">
        {timer !== 30 && timer !== 1 && (
          <p className="text-4xl font-semibold mb-4 text-center text-blue-600">
            Game starts in {timer} seconds!
          </p>
        )}
        <p className="text-2xl mb-6 text-center text-gray-700">
          Please do not refresh the page
        </p>
      </div>
      <div className="relative w-full h-full overflow-hidden">
        {users.map((user) => (
          <Bubble key={user.id} name={user.name} />
        ))}
      </div>
    </div>
  );
}
