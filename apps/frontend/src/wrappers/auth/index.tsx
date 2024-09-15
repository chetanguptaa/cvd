import userAtom from "@/store/atoms/userAtom";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const user = useRecoilValueLoadable(userAtom);
  const navigate = useNavigate();
  if (user.state === "hasValue") {
    navigate("/");
    return;
  } else if (user.state === "loading") {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Loader className="animate-spin h-12 w-12  text-purple-300" />
      </div>
    );
  } else {
    return <>{children}</>;
  }
};

export default AuthWrapper;
