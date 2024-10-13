"use client";

import { ArrowRight } from "lucide-react";
import TitleBackdropSvg from "./title-backdrop-svg";
import { Button } from "@/components/ui/button";
import { Bruno_Ace_SC } from "next/font/google";
import signup from "@/app/actions/signup";
import { toast } from "@/hooks/use-toast";
import validateUserToken from "@/app/actions/validate-user-token";
import { useRouter } from "next/navigation";

export const bruno_ace_sc = Bruno_Ace_SC({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bruno-ace-sc",
  display: "swap",
});

export default function HeroBanner() {
  const router = useRouter();
  const handleClick = async () => {
    try {
      const res = await validateUserToken();
      if (res.success) {
        router.push("/race");
      } else {
        if (!res.success) {
          const res = await signup();
          if (!res.success) {
            toast({
              title: "Failure",
              description: res.error,
            });
          } else {
            router.push("/race");
          }
        } else {
          router.push("/race");
        }
      }
    } catch (error) {
      toast({
        title: "Failure",
        description: "Some error occured, please try again later!",
      });
    }
  };

  return (
    <div className="relative min-h-[300px] md:min-h-[70vh] w-full md:w-3/5 mb-4 md:mb-0 before:content[''] before:w-full before:h-full before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:bg-gradient-to-r before:from-background before:via-transparent before:to-background">
      <TitleBackdropSvg />
      <div className="absolute top-[50%] max-md:left-[50%] max-md:translate-x-[-50%] max-md:mx-auto translate-y-[-50%] text-center md:text-left">
        <h1
          className={
            "text-5xl leading-normal font-special lg:text-7xl xl:text-8xl md:leading-none color-primary " +
            bruno_ace_sc.variable
          }
        >
          CVD<span className="text-sm">(cracked vim devs 🫥)</span>
        </h1>
        <p className="my-2 text-lg md:text-2xl color-primary">
          Test your vim typing speed and race against other coders
        </p>
        <div className="my-10  max-md:flex max-md:items-center max-md:justify-center">
          <Button
            variant="outline"
            onClick={handleClick}
            title="Start Racing"
            className="flex items-center gap-2 px-4 py-2 font-medium tracking-wider text-primary rounded-md w-fit  md:text-2xl border-none"
            data-cy="start-racing-button"
          >
            Start Racing <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
