import Header from "@/components/header";
import { Icons } from "@/components/header/icons";
import MainLoader from "@/components/ui/loader";
import userAtom from "@/store/atoms/userAtom";
import LandingWrapper from "@/wrappers/landing";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";

// TODO :- here if the userbase increase 🤞, we'll create a websocket connection here to show how many players are currently playing
// TODO :- Take inspiration from chess.com landing page

const LandingPage = () => {
  const user = useRecoilValueLoadable(userAtom);
  if (user.state === "loading") {
    return <MainLoader />;
  }
  return (
    <LandingWrapper>
      <section>
        <Header />
        <div className="h-[100vh] w-full bg-dot-black/[0.2]">
          <div className="[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <main className="flex flex-col h-screen items-center">
            <Link
              target="_blank"
              to="https://github.com/chetanguptaa/vim-racer"
            >
              <span className="flex justify-between space-x-2 items-center cursor-pointer select-none rounded-full border border-slate-800 border-opacity-[0.15] px-4 py-1 uppercase text-xs font-medium bg-gray-50 dark:bg-slate-200 hover:bg-zinc-100 dark:hover:bg-slate-300 dark:text-black mt-8">
                <Icons.gitHub className="w-4 h-4" />
                <p>
                  <span className="sm:inline-block ">Star us on GitHub</span>
                </p>
                <ChevronRight />
              </span>
            </Link>
            <div className="mt-8 text-center">
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.15] text-black dark:text-gray-200 sm:text-6xl sm:leading-[1.15]">
                Master your VIM skills with VIMRacer
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-indigo-400 bg-clip-text text-transparent">
                  Contests
                </span>
              </h1>
            </div>
          </main>
        </div>
      </section>
    </LandingWrapper>
  );
};

export default LandingPage;
