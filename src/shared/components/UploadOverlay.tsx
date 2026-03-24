const UploadOverlay = () => {
  return (
    <div className="fixed inset-0 bg-foreground/70 text-background text-lg z-1000 flex items-center justify-center pointer-events-none">
      <div className="p-10 border-4 border-dashed border-background rounded-2xl">
        Drop the image to Upload it
      </div>
    </div>
  );
};

export default UploadOverlay;
