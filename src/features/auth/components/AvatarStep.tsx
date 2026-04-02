import { useAuthStore } from "@/app/providers/user";
import { Button } from "@/shared/components/ui/button";
<<<<<<< HEAD
import UploadOverlay from "@/shared/components/UploadOverlay";
import { CameraAdd01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useRef, useState } from "react";
=======
import { useState } from "react";
>>>>>>> 6320c31 (chore: cleaned the architecture)
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import AvatarUploader from "@/shared/components/AvatarUploader";
import { uploadAvatar } from "../utils/apis";

const AvatarStep = () => {
  const { setUser } = useAuthStore.getState();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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

  return (
    <>
      <Header />

      <AvatarUploader value={preview ?? ""} handleUpload={handleUpload} />
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

export default AvatarStep;
