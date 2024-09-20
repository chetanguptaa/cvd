import { Link, useNavigate } from "react-router-dom";
import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from "recoil";
import userAtom from "@/store/atoms/userAtom";
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import MainLoader from "./ui/loader";
import guestAtom from "@/store/atoms/guestAtom";

const Header = () => {
  const user = useRecoilValueLoadable(userAtom);
  const guest = useRecoilValueLoadable(guestAtom);
  const refreshUser = useRecoilRefresher_UNSTABLE(userAtom);
  const refreshGuest = useRecoilRefresher_UNSTABLE(guestAtom);
  const navigate = useNavigate();
  let content: React.ReactNode;
  if (user.state === "loading" || guest.state === "loading") {
    content = <MainLoader />;
  } else if (
    (user.state === "hasValue" && user.contents) ||
    (guest.state === "hasValue" && guest.contents)
  ) {
    content = (
      <nav className="items-center space-x-6 md:flex hidden">
        <Button
          className="text-sm font-medium text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-400"
          variant="outline"
          onClick={() => {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("guest_auth_token");
            refreshUser();
            refreshGuest();
            navigate("/auth/signin");
          }}
        >
          Logout
        </Button>
      </nav>
    );
  } else {
    content = (
      <nav className="items-center space-x-6 md:flex hidden">
        <Link
          className="text-sm font-medium text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-400"
          to="/auth/signin"
        >
          Log in
        </Link>
        <Link
          className="transition-all duration-300 hover:scale-110"
          to="/auth/signup"
        >
          <button className="p-1 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            <div className="px-2 rounded-2xl relative group transition duration-200 text-white hover:bg-transparent flex justify-start items-center gap-2">
              <p>Sign up</p>
              <ChevronRight />
            </div>
          </button>
        </Link>
      </nav>
    );
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mx-auto">
      <div className="flex h-14 items-center justify-between px-8">
        <Link className="font-bold" to="/">
          <img src="/logo.jpg" className="w-12 h-12 rounded-full" />
        </Link>
        {content}
      </div>
    </header>
  );
};

export default Header;
