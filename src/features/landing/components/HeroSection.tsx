import { Link } from "react-router";

import { Button } from "@/shared/components/ui/button";

const stats = [
  { value: "120+", label: "Teams onboarded" },
  { value: "8 hrs", label: "Weekly time saved" },
  { value: "3x", label: "Clearer execution" },
];

const highlights = [
  {
    title: "Refine onboarding checklist",
    meta: "Owners: Jordan, Lee, Maria",
  },
  {
    title: "Finalize org permissions",
    meta: "Owners: Amina, Dev team",
  },
  {
    title: "Publish release notes",
    meta: "Owner: Marketing",
  },
];

const HeroSection = () => {
  return (
    <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <div className="space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
          Teamflow for product teams
        </p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
          A single workspace for plans, tasks, and velocity.
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          Keep every team aligned with shared timelines, visible ownership, and
          a daily cadence that turns ideas into shipped work faster.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <Link to="/account/register">Create your workspace</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/account/login">I already have an account</Link>
          </Button>
        </div>
        <div className="grid max-w-xl grid-cols-3 gap-4 text-sm text-muted-foreground">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card/80 p-4"
            >
              <p className="text-lg font-semibold text-foreground">
                {stat.value}
              </p>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card/90 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">
              Today
            </p>
            <h2 className="text-xl font-semibold">Launch readiness</h2>
          </div>
          <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            Sprint 12
          </span>
        </div>
        <div className="mt-6 space-y-4 text-sm">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-background/80 p-4"
            >
              <p className="font-semibold">{item.title}</p>
              <p className="mt-2 text-muted-foreground">{item.meta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
