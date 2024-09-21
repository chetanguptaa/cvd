import { ArrowRight } from "lucide-react";
import TitleBackdropSvg from "./title-backdrop-svg";
import { useNavigate } from "react-router-dom";
import guestAtom from "@/store/atoms/guestAtom";
import { Button } from "@/components/ui/button";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import axios from "axios";
import { BACKEND_URL } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { getGuestToken, getUserToken } from "@/lib/utils";

export default function HeroBanner() {
  const { toast } = useToast();
  const refreshGuest = useRecoilRefresher_UNSTABLE(guestAtom);
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const userToken = getUserToken();
      if (userToken) {
        navigate("/race");
      } else {
        const guestToken = getGuestToken();
        if (guestToken) {
          navigate("/race");
          toast({
            title: "You are continuing as a guest",
          });
          return;
        }
        const res = await axios.get<{ token: string }>(
          BACKEND_URL + "/auth/guest/signup"
        );
        if (res.data) {
          localStorage.setItem("guest_auth_token", res.data.token);
          toast({
            title: "You are continuing as a guest",
          });
          refreshGuest();
          navigate("/race");
        }
      }
    } catch (e: unknown) {
      console.log(e);
      toast({
        title: "Some error occured, please try again later",
      });
    }
  };

  return (
    <div className="relative min-h-[300px] md:min-h-[70vh] w-full md:w-3/5 mb-4 md:mb-0 before:content[''] before:w-full before:h-full before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:bg-gradient-to-r before:from-background before:via-transparent before:to-background">
      <TitleBackdropSvg />
      <div className="absolute top-[50%] max-md:left-[50%] max-md:translate-x-[-50%] max-md:mx-auto translate-y-[-50%] text-center md:text-left">
        <h1 className="text-5xl leading-normal font-special lg:text-7xl xl:text-8xl md:leading-none color-primary">
          VimRacer
        </h1>
        <p className="my-2 text-lg md:text-2xl color-primary">
          Test your vim typing speed and race against other coders
        </p>
        <div className="my-10  max-md:flex max-md:items-center max-md:justify-center">
          <Button
            onClick={handleClick}
            title="Start Racing"
            className="flex items-center gap-2 px-4 py-2 font-medium tracking-wider text-black transition-colors rounded-md w-fit bg-warning md:text-2xl ring-offset-background bg-primary"
            data-cy="start-racing-button"
          >
            Start Racing <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
