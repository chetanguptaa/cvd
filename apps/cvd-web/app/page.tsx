import { Icons } from "@/components/icons";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import HeroBanner from "@/components/landing/hero-banner";
import BannerSvg from "@/components/landing/banner-svg";

export default function Home() {
  return (
    <section>
      <div className="w-full bg-dot-black/[0.2]">
        <main className="flex flex-col items-center">
          <Link target="_blank" href="https://github.com/chetanguptaa/cvd">
            <span className="flex justify-between space-x-2 items-center cursor-pointer select-none rounded-full border border-slate-800 border-opacity-[0.15] px-4 py-1 uppercase text-xs font-medium bg-gray-50 dark:bg-slate-200 hover:bg-zinc-100 dark:hover:bg-slate-300 dark:text-black mt-8">
              <Icons.gitHub className="w-4 h-4" />
              <p>
                <span className="sm:inline-block ">Star us on GitHub</span>
              </p>
              <ChevronRight />
            </span>
          </Link>
        </main>
      </div>
      <div className="flex justify-between items-center">
        <HeroBanner />
        <BannerSvg
          gearRightClass={"origin-[50%_50%] animate-gear-rotate-left"}
          gearLeftClass={"origin-[50%_50%] animate-gear-rotate-right"}
        />
      </div>
    </section>
  );
}
