import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export default function StartRacingBtn(handleClick: () => Promise<void>) {
  return (
    <Button
      variant="outline"
      onClick={handleClick}
      title="Start Racing"
      className="flex items-center gap-2 px-4 py-2 font-medium tracking-wider text-primary rounded-md w-fit  md:text-2xl border-none"
      data-cy="start-racing-button"
    >
      Start Racing <ArrowRight />
    </Button>
  );
}
