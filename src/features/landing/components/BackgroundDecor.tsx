const BackgroundDecor = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-secondary/60 blur-[140px]" />
      <div className="absolute left-1/3 top-1/2 h-48 w-48 rounded-full bg-muted/70 blur-[120px]" />
    </div>
  );
};

export default BackgroundDecor;
