import PracticeRaceCard from "@/components/app/race/card/practice-race-card";
import MainLoader from "@/components/ui/loader";
import guestAtom from "@/store/atoms/guestAtom";
import userAtom from "@/store/atoms/userAtom";
import { useNavigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";

export default function RacePage() {
  const guest = useRecoilValueLoadable(guestAtom);
  const user = useRecoilValueLoadable(userAtom);
  const navigate = useNavigate();

  if (user.state === "loading" || guest.state === "loading") {
    return <MainLoader />;
  }
  if (user.state === "hasError" && guest.state === "hasError") {
    navigate("/");
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
      <div className="grid grid-cols-1 gap-8 my-10 lg:grid-cols-3">
        <PracticeRaceCard />
      </div>
    </main>
  );
}
