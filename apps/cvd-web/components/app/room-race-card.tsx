"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import { FormEvent, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
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
import { useRouter } from "next/navigation";
import LanguageDropdown from "./language-dropdown";
import createGame from "@/app/actions/create-game";

export default function RoomRaceCard() {
  const [selectedPracticeLanguage, setSelectedPracticeLanguage] =
    useState("go");
  const [error, setError] = useState("");
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [roomId, setRoomId] = useState("");
  const { toast } = useToast();
  const router = useRouter();

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
    const res = await createGame();
    if (!res.success) {
      toast({
        title: res.error,
      });
      return;
    }
    router.push("/game/" + res.gameId + "/lobby");
  }

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
