import MainLoader from "@/components/ui/loader";
import guestAtom from "@/store/atoms/guestAtom";
import userAtom from "@/store/atoms/userAtom";
import { useRecoilValueLoadable } from "recoil";

const LandingWrapper = ({ children }: { children: React.ReactNode }) => {
  const user = useRecoilValueLoadable(userAtom);
  const guest = useRecoilValueLoadable(guestAtom);
  if (user.state === "loading" || guest.state === "loading")
    return <MainLoader />;
  return <>{children}</>;
};

export default LandingWrapper;
