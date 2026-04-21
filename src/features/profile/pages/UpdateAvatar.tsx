import { useAuthStore } from "@/app/providers/user";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import AvatarUploader from "@/shared/components/AvatarUploader";
import { uploadAvatar } from "../utils/apis";

const UpdateAvatar = () => {
  const { setUser, user } = useAuthStore.getState();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(user?.avatarUrl || "");

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
    <div className="flex flex-col items-center py-20">
      <Header />

      <AvatarUploader value={preview ?? ""} handleUpload={handleUpload} />
      {/* Submit Button */}
      <Button
        className="w-80 mt-6 h-10 text-md cursor-pointer hover:scale-95 transition-transform"
        onClick={onSubmit}
        disabled={loading || !file}
      >
        {loading ? "Uploading..." : "Update"}
      </Button>
      <Link
        to="/profile"
        className="mt-2 text-sm hover:text-primary hover:underline"
      >
        Cancel
      </Link>
    </div>
  );
};

const Header = () => {
  return (
    <>
      <h2 className="text-xl font-bold text-foreground w-80 text-center">
        Update Your Avatar
      </h2>
    </>
  );
};

export default UpdateAvatar;
