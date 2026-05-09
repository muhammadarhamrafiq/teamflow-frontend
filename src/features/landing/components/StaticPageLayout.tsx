import type { ReactNode } from "react";

import BackgroundDecor from "./BackgroundDecor";
import LandingFooter from "./LandingFooter";
import LandingHeader from "./LandingHeader";

type StaticPageLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

const StaticPageLayout = ({
  title,
  description,
  children,
}: StaticPageLayoutProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <BackgroundDecor />
      <LandingHeader />
      <main className="mx-auto w-full max-w-5xl px-6 pb-20 pt-6">
        <div className="space-y-4 pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Teamflow
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
          {description ? (
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </main>
      <LandingFooter />
    </div>
  );
};

export default StaticPageLayout;
