import { useAuthStore } from "@/app/providers/user";
import NameField from "@/shared/components/NameInput";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { updateName } from "../utils/apis";

const UpdateName = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState<string>();
  const { user, setUser } = useAuthStore.getState();
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (loading) return;

    if (!name) {
      setInputError("Name is Required");
      return;
    } else if (name.trim().length < 3) {
      setInputError("Name must contain three letters");
      return;
    }

    setLoading(true);

    const res = await updateName(name);
    if (res.error) {
      toast.error(res.error || "Something went wrong");
      setLoading(false);
      return;
    }

    toast.success("Name has been updated successfully");
    setUser({
      ...user!,
      name: name,
    });
    navigate("/profile");
  };

  return (
    <div className="flex flex-col items-center py-20">
      <h2 className="w-80 text-lg font-semibold">Update your user name here</h2>
      <p className="w-80 text-accent-foreground text-xs">
        Enter the new user name to update
      </p>
      <NameField
        className="mt-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
        error={inputError}
      />
      <Button
        className="w-80 mt-2 h-10 text-md cursor-pointer hover:scale-95 transition-transform"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Update"}
      </Button>
    </div>
  );
};

export default UpdateName;
