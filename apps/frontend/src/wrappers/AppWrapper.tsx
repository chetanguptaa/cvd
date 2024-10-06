import Header from "@/components/header";
import MainLoader from "@/components/ui/loader";
import guestAtom from "@/store/atoms/guestAtom";
import userAtom from "@/store/atoms/userAtom";
import { useRecoilValueLoadable } from "recoil";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const user = useRecoilValueLoadable(userAtom);
  const guest = useRecoilValueLoadable(guestAtom);
  if (user.state === "loading" || guest.state === "loading")
    return <MainLoader />;
  return (
    <>
      <Header />
      <div className="container h-fit">{children}</div>
    </>
  );
};

export default AppWrapper;
