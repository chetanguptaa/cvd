import { Link, useNavigate } from "react-router-dom";
import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from "recoil";
import userAtom from "@/store/atoms/userAtom";
import { Button } from "./ui/button";
import MainLoader from "./ui/loader";
import { ModeToggle } from "./ui/mode-toggle";

const Header = () => {
  const user = useRecoilValueLoadable(userAtom);
  const refreshUser = useRecoilRefresher_UNSTABLE(userAtom);
  const navigate = useNavigate();
  let content: React.ReactNode;
  if (user.state === "loading") {
    content = <MainLoader />;
  } else if (user.state === "hasValue" && user.contents) {
    content = (
      <nav className="items-center space-x-6 md:flex hidden">
        <Button
          className="text-sm font-medium text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-400"
          variant="outline"
          onClick={() => {
            localStorage.removeItem("auth_token");
            refreshUser();
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
        <Link to="/auth/signup">
          <Button>Sign up</Button>
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
        <div className="flex justify-center items-center space-x-4">
          {content}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
