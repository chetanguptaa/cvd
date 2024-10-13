import Link from "next/link";
import { ModeToggle } from "./ui/mode-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-8">
        <Link className="font-bold" href="/">
          LOGO
        </Link>
        <div className="flex justify-center items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
