import AvatarUploader from "@/shared/components/AvatarUploader";
import DescriptionInput from "@/shared/components/DescriptionInput";
import InputField from "@/shared/components/InputField";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useCreateOrganization } from "../hooks/useOrganization";

interface InputErrors {
  name?: string;
  description?: string;
}

const AddOrganization = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inputErrors, setInputErrors] = useState<InputErrors>({});

  const createMutation = useCreateOrganization();
  const navigate = useNavigate();

  const handleUpload = (file?: File) => {
    if (!file) return;
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const errors = validate(name, description);
    setInputErrors(errors);
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }

    const res = await createMutation.mutateAsync({
      name: name.trim(),
      description: description.trim(),
      file,
    });
    if (!res.success) {
      toast(res.error);
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate(`/orgs/${res.data?.organization.slug}`);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-xl font-semibold py-4">Create the Organization</h1>
      <AvatarUploader value={preview ?? ""} handleUpload={handleUpload} />
      <InputField
        label="Enter Organization Name"
        placeholder="Enter Organization Description"
        className="mt-2 w-80"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={inputErrors.name}
        disabled={loading}
      />
      <DescriptionInput
        placeholder="Enter Organization Description"
        label="Organization Description"
        className="mt-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={inputErrors.description}
        disabled={loading}
      />
      <Button
        className="w-80 mt-2 h-10 text-md cursor-pointer hover:scale-98 focus:scale-98 focus:bg-primary/80"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Creating" : "Create Organization"}
      </Button>
    </div>
  );
};

function validate(name: string, description: string) {
  const errors: InputErrors = {};

  if (!name) errors.name = "Name is required";
  else if (name.trim().length < 3 || name.trim().length > 50)
    errors.name = "Name should must contain 3 to 50 characters";

  if (
    description.length > 0 &&
    (description.length < 10 || description.length > 500)
  )
    errors.description = "description should contain 10 to 500 characters";

  return errors;
}

export default AddOrganization;
