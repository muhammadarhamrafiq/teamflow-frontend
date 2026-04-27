import { CameraAdd01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useRef, useState } from "react";
import UploadOverlay from "./UploadOverlay";

type AvatarUploaderProps = {
  value: string;
  handleUpload: (file?: File) => void;
};

const AvatarUploader = ({ value, handleUpload }: AvatarUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);

  const dragCounter = useRef(0);

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
  }, [handleUpload]);

  return (
    <>
      {dragActive && <UploadOverlay />}

      {/* Preview */}
      <label
        htmlFor="avatar"
        className="w-64 h-64 border overflow-hidden rounded-full mt-2 cursor-pointer text-ring hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
      >
        {value !== "" ? (
          <img
            src={value}
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
    </>
  );
};

export default AvatarUploader;
