import LogoWithText from "@/shared/components/LogoWithText";
import ThemeSwitch from "@/shared/components/ThemeSwitch";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router";

const LandingHeader = () => {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
      <LogoWithText size="md" />
      <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
        <a className="transition hover:text-foreground" href="#features">
          Features
        </a>
        <a className="transition hover:text-foreground" href="#workflow">
          Workflow
        </a>
        <a className="transition hover:text-foreground" href="#security">
          Security
        </a>
      </nav>
      <div className="flex items-center gap-3">
        <ThemeSwitch />
        <Button asChild size="sm" className="hidden sm:inline-flex">
          <Link to="/account/register">Get started</Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="hidden sm:inline-flex"
        >
          <Link to="/account/login">Sign in</Link>
        </Button>
      </div>
    </header>
  );
};

export default LandingHeader;
