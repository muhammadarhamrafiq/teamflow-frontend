import { useAuthStore } from "@/app/providers/user";
import { Button } from "@/shared/components/ui/button";
import UploadOverlay from "@/shared/components/UploadOverlay";
import { CameraAdd01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import type { InputFieldProps } from "../utils";
import { uploadAvatar } from "../utils/apis";

const AvatarStep = () => {
  const { setUser } = useAuthStore.getState();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const dragCounter = useRef(0);
  const navigate = useNavigate();

  const handleUpload = (file?: File) => {
    if (!file) return;
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async () => {
    if (!file) return;

    setLoading(true);
    const res = await uploadAvatar(file);
    if (res.success) {
      const data = res.data!;
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        avatarUrl: data.user.avatarUrl,
      });
      navigate("/dashboard");
    } else {
      toast.error(res.error);
    }

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
      {dragActive && <UploadOverlay />}

      <Header />

      <AvatarUploader
        value={preview ?? ""}
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

const Header = () => {
  return (
    <>
      <h2 className="text-xl font-bold text-foreground w-80 text-center">
        Upload Avatar
      </h2>
      <p className="w-80 text-xs text-secondary-foreground text-center">
        Upload profile picture you can always change it later
      </p>
    </>
  );
};

const AvatarUploader = ({ onChange, value }: InputFieldProps) => {
  return (
    <>
      {/* Preview */}
      <label
        htmlFor="avatar"
        className="w-80 h-80 border overflow-hidden rounded-full mt-2 cursor-pointer text-ring hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
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
        onChange={onChange}
      />
    </>
  );
};

export default AvatarStep;
