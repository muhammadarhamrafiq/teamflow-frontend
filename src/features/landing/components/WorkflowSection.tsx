const workflowSteps = [
  "Plan outcomes and timelines",
  "Align teams and ownership",
  "Track execution daily",
  "Share progress instantly",
];

const WorkflowSection = () => {
  return (
    <section id="workflow" className="mt-20">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Workflow
          </p>
          <h2 className="text-3xl font-semibold">
            Move from planning to launch without the chaos.
          </h2>
          <p className="text-sm text-muted-foreground">
            TeamFlow builds a steady rhythm for shipping. Set goals, assign
            ownership, and keep your team in sync through every milestone.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {workflowSteps.map((step) => (
            <div
              key={step}
              className="rounded-2xl border border-border bg-card/90 p-5 text-sm text-muted-foreground"
            >
              <p className="font-semibold text-foreground">{step}</p>
              <p className="mt-2">
                Keep updates tied to the work so everyone stays in the loop.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
