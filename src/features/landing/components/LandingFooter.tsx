import { Link } from "react-router";

import { Button } from "@/shared/components/ui/button";

const LandingFooter = () => {
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-foreground">Teamflow</p>
          <p>Plan, execute, and deliver together.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link className="transition hover:text-foreground" to="/contact-us">
            Contact
          </Link>
          <Link
            className="transition hover:text-foreground"
            to="/privacy-policy"
          >
            Privacy
          </Link>
          <Link
            className="transition hover:text-foreground"
            to="/term-and-conditions"
          >
            Terms
          </Link>
        </div>
        <div className="flex gap-3 sm:hidden">
          <Button asChild size="sm">
            <Link to="/account/register">Get started</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/account/login">Sign in</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
