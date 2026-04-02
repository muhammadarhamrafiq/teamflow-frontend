const features = [
  {
    title: "Unified workspaces",
    description:
      "Keep every org, project, and team in one place with clear boundaries and shared visibility.",
  },
  {
    title: "Focus-driven boards",
    description:
      "Prioritize daily execution with swimlanes that surface blockers before they slow down momentum.",
  },
  {
    title: "Instant alignment",
    description:
      "Broadcast milestones, decisions, and status updates across every stakeholder instantly.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="mt-20 grid gap-6 md:grid-cols-3">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="rounded-2xl border border-border bg-card/90 p-6"
        >
          <h3 className="text-lg font-semibold">{feature.title}</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            {feature.description}
          </p>
        </div>
      ))}
    </section>
  );
};

export default FeaturesSection;
