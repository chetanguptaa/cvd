import RoomRaceCard from "@/components/app/room-race-card";
import getUser from "../../actions/get-user";
import { redirect } from "next/navigation";

export default async function page() {
  const res = await getUser();
  if (!res.success) {
    redirect("/");
  }
  return (
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
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 my-10 w-fit mx-auto">
        <RoomRaceCard />
      </div>
    </main>
  );
}
