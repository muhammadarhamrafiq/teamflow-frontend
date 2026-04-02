const securityHighlights = [
  "Enterprise-ready org permissions.",
  "Centralized activity visibility.",
  "Secure collaboration by default.",
];

const SecuritySection = () => {
  return (
    <section id="security" className="mt-20">
      <div className="rounded-3xl border border-border bg-card/90 p-8 md:p-10">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">Built for trusted teams</h2>
            <p className="text-sm text-muted-foreground">
              Role-based access, audit-friendly activity tracking, and secure
              org separation are baked in from day one.
            </p>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground">
            {securityHighlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border bg-background/80 p-4"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
