"use client";

import SignalingManager from "@/lib/SignalingManager";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Lobby(props: {
  user?: {
    id: string;
    name: string;
    createdAt: Date;
  };
  gameId: string;
  token?: string;
}) {
  const router = useRouter();
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  if (!props.user) {
    router.push("/");
  }
  useEffect(() => {
    SignalingManager.getInstance(props.token).registerCallback(
      "JOIN_GAME",
      (u: { id: string; name: string }) => {
        const user = users.find((user) => user.id === u.id);
        if (user) return;
        users.push(u);
      },
      "gameId-" + props.gameId
    );
    SignalingManager.getInstance(props.token).registerCallback(
      "LEAVE_GAME",
      (u: { id: string; name: string }) => {
        const newUsers = [];
        for (let i = 0; i < users.length; i++) {
          if (users[i].id === u.id) continue;
          else {
            newUsers.push({
              id: users[i].id,
              name: users[i].name,
            });
          }
        }
        setUsers(newUsers);
      },
      "gameId-" + props.gameId
    );
    SignalingManager.getInstance(props.token).sendMessage({
      type: "JOIN_GAME",
      payload: {
        gameId: props.gameId,
      },
    });
    return () => {
      SignalingManager.getInstance(props.token).sendMessage({
        type: "LEAVE_GAME",
        payload: {
          gameId: props.gameId,
        },
      });
      SignalingManager.getInstance(props.token).deRegisterCallback(
        "JOIN_GAME",
        "gameId-" + props.gameId
      );
      SignalingManager.getInstance(props.token).deRegisterCallback(
        "LEAVE_GAME",
        "gameId-" + props.gameId
      );
    };
  }, []);
  return <div>{JSON.stringify(props.user, null, 2)}</div>;
}
