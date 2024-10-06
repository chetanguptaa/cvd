import AppWrapper from "@/wrappers/AppWrapper";
import RoomRaceCard from "../_components/room-race-card";
import { useUser } from "@/hooks/use-user";
import { useToast } from "@/hooks/use-toast";

export default function RacePage() {
  const user = useUser();
  const { toast } = useToast();
  if (!user) return;
  if (user.error) {
    toast({
      title: "Some error occured, please try again later",
    });
  }
  return (
    <AppWrapper>
      <main className="pt-12">
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-special font-bold tracking-tight text-primary">
            Choose a Race Mode
          </h2>
          <p className="text-sm md:text-base mt-1 text-muted-foreground">
            Practice your typing skills by yourself, with friends, or with other
            devs online
          </p>
        </div>
        {/* HERE CREATE MORE TYPE, AS THE TIME OF WRITING WE ONLY HAVE ROOMRACE */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 my-10 w-fit mx-auto">
          <RoomRaceCard
            id={user.id || ""}
            isGuest={user.isGuest || false}
            name={user.name || ""}
          />
        </div>
      </main>
    </AppWrapper>
  );
}
