import { Link } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import userAtom from "@/store/atoms/userAtom";
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const user = useRecoilValueLoadable(userAtom);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mx-auto">
      <div className="flex h-14 items-center justify-between px-8">
        <Link className="font-bold" to="/">
          VimRacer
        </Link>
        {user.state !== "hasValue" ?
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
                <div className="px-2 rounded-2xl  relative group transition duration-200 text-white hover:bg-transparent flex justify-start items-center gap-2">
                  <p>Sign up</p>
                  <ChevronRight />
                </div>
              </button>
            </Link>
          </nav>
        : <nav className="items-center space-x-6 md:flex hidden">
            <Button
              className="text-sm font-medium text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-400"
              variant="outline"
              onClick={() => localStorage.removeItem("authorization")}
            >
              Logout
            </Button>
          </nav>
        }
      </div>
      <div className="absolute -bottom-5 z-50 h-10 w-full [mask:linear-gradient(90deg,transparent,black_20%,black_80%,transparent)] before:absolute before:inset-0 before:top-5 before:h-[1px] before:bg-gradient-to-r before:from-[#A45EE5] before:via-[#2832C2] before:via-[25%] before:to-[#2832C2] before:opacity-20 before:blur-[2px] after:absolute after:inset-0 after:left-1/2 after:top-5 after:h-[1px] after:w-full after:-translate-x-1/2 after:bg-gradient-to-r after:from-[#A45EEF] after:via-[#A45EE5] after:via-[25%] after:to-[#2832C2] after:[mask:linear-gradient(90deg,transparent,black,black,transparent)]"></div>
    </header>
  );
};

export default Header;
