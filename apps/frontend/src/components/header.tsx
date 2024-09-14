import { Icons } from "./header/icons";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:max-w-screen-xl items-center max-w-screen-sm mx-auto">
        <div className="flex flex-1 items-center justify-end">
          <nav className="flex items-center space-x-6">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/chetanguptaa"
            >
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 w-9 px-0">
                <Icons.gitHub className="w-8 h-8" />
              </div>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
