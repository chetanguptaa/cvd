import MainLoader from "@/components/ui/loader";
import userAtom from "@/store/atoms/userAtom";
import { useNavigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const user = useRecoilValueLoadable(userAtom);
  const navigate = useNavigate();
  if (user.state === "hasValue") {
    navigate("/");
    return;
  } else if (user.state === "loading") {
    return <MainLoader />;
  } else {
    return <>{children}</>;
  }
};

export default AuthWrapper;
