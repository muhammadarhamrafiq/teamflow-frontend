import { CameraAdd01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Button } from "../../../components/ui/button";

const AvatarStep = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Use a ref for the counter to avoid stale closures in event listeners
  const dragCounter = useRef(0);

  const handleUpload = (file?: File) => {
    if (!file) return;
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = () => {
    setLoading(true);
    // Upload Api
    setLoading(false);
  };

  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current++;
      if (dragCounter.current > 0) {
        setDragActive(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current--;
      if (dragCounter.current === 0) {
        setDragActive(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      dragCounter.current = 0; // Reset counter on drop

      if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
        handleUpload(e.dataTransfer.files[0]);
      }
    };

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  return (
    <>
      {/* Overlay - Add pointer-events-none to children to be safe */}
      {dragActive && (
        <div className="fixed inset-0 bg-foreground/70 text-background text-lg z-1000 flex items-center justify-center pointer-events-none">
          <div className="p-10 border-4 border-dashed border-background rounded-2xl">
            Drop the image to Upload it
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold text-foreground w-80 text-center">
        Upload Avatar
      </h2>
      <p className="w-80 text-xs text-secondary-foreground text-center">
        Upload profile picture you can always change it later
      </p>

      {/* Preview */}
      <label
        htmlFor="avatar"
        className="w-80 h-80 border overflow-hidden rounded-full mt-2 cursor-pointer text-ring hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
      >
        {preview ? (
          <img
            src={preview}
            alt="avatar-preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center flex-col">
            <HugeiconsIcon icon={CameraAdd01Icon} size={36} />
            <span className="text-sm mt-2">Upload or Drag and Drop Image</span>
          </div>
        )}
      </label>

      {/* Input Field */}
      <input
        type="file"
        id="avatar"
        accept="image/*"
        className="sr-only"
        onChange={(e) => handleUpload(e.target.files?.[0])}
      />

      {/* Submit Button */}
      <Button
        className="w-80 mt-6 h-10 text-md cursor-pointer hover:scale-95 transition-transform"
        onClick={onSubmit}
        disabled={loading || !file}
      >
        {loading ? "Uploading..." : "Continue"}
      </Button>
      <Link
        to="/dashboard"
        className="mt-2 text-sm hover:text-primary hover:underline"
      >
        Skip for Now
      </Link>
    </>
  );
};

export default AvatarStep;
