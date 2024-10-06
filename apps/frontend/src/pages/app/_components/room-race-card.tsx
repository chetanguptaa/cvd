import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import { FormEvent, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import LanguageDropdown from "./language-dropdown";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axios from "axios";
import { BACKEND_URL } from "@/constants";
import { useSocket } from "@/hooks/use-socket";

export default function RoomRaceCard(user: {
  id: string;
  name: string;
  isGuest: boolean;
}) {
  const [selectedPracticeLanguage, setSelectedPracticeLanguage] =
    useState("go");
  const [error, setError] = useState("");
  const socket = useSocket(user);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [createGameRes, setCreateGameRes] = useState<{
    message: string;
    gameId: string;
  } | null>(null);
  const [createGameError, setCreateGameError] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  function handleSetCodeLanguage(props: SetStateAction<string>) {
    setSelectedPracticeLanguage(props);
    setError("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!selectedPracticeLanguage) {
      return setError("please select a language to practice");
    }
    // FIRST MAKE THE BACKEND REQUEST AND THEN GET THE ID
    console.log("user is this ", user);

    if (user.isGuest) {
      axios
        .post(
          BACKEND_URL + "/game",
          {},
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("guest_auth_token")}`,
            },
          }
        )
        .then((res) => {
          setCreateGameRes(res.data);
        })
        .catch((err) => {
          setCreateGameError(err);
        });
    } else {
      axios
        .post(
          BACKEND_URL + "/game",
          {},
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        )
        .then((res) => {
          setCreateGameRes(res.data);
        })
        .catch((err) => {
          setCreateGameError(err);
        });
    }
  }

  useEffect(() => {
    if (!createGameRes || createGameError.length > 0 || !socket) return;

    socket.send(
      JSON.stringify({
        type: "JOIN_GAME",
        payload: {
          gameId: createGameRes.gameId,
        },
      })
    );
  }, [createGameError.length, createGameRes, socket]);

  useEffect(() => {
    if (!socket || !createGameRes || createGameError.length > 0) {
      return;
    }
    socket.onmessage = function (event) {
      const message = JSON.parse(event.data);
      switch (message.t) {
        case "JOIN_GAME":
          navigate("/game/" + createGameRes.gameId + "/lobby");
          break;
        default:
          toast({
            title: message.m,
          });
          break;
      }
    };
  }, [createGameError, createGameRes, navigate, socket, toast]);

  function handleJoinRoom() {
    if (roomId.trim() === "") {
      toast({
        title: "Please enter a valid room id",
        variant: "destructive",
      });
      return;
    }
    console.log(`Joining room: ${roomId}`);
    setIsJoinDialogOpen(false);
  }

  return (
    <Card
      className="flex flex-col justify-between flex-1 border-2 border-warning"
      data-cy="practice-card"
    >
      <CardHeader>
        <div className="grid text-center place-content-center">
          <Users className="justify-self-center" size={40} />
          <h2 className="text-3xl font-bold text-warning font-special">
            Race Friends
          </h2>
          <p className="font-light">
            Create your own racetrack and play with friends
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col space-y-2"
        >
          <div className="flex flex-col w-full">
            <LanguageDropdown
              className={cn(error && "border-red-500")}
              value={selectedPracticeLanguage}
              onChange={handleSetCodeLanguage}
            />
            <span className="text-red-500">{error}</span>
          </div>
          <div className="flex justify-center items-center w-full space-x-2">
            <Button
              variant="ghost"
              className="relative justify-start border w-full"
              data-cy="practice-button"
            >
              Create Room{" "}
              <ArrowRight
                size="20"
                className="absolute -translate-y-1/2 right-4 top-1/2"
              />
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="relative justify-start border w-full"
              data-cy="join-room-button"
              onClick={() => setIsJoinDialogOpen(true)}
            >
              Join Room{" "}
              <ArrowRight
                size="20"
                className="absolute -translate-y-1/2 right-4 top-1/2"
              />
            </Button>
          </div>
        </form>
      </CardContent>
      <AlertDialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Join a Room</AlertDialogTitle>
            <AlertDialogDescription>
              Enter the room ID to join an existing race.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleJoinRoom}
              disabled={roomId.length === 0}
            >
              Join
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
