import type { InputFieldProps } from "@/app";
import AvatarUploader from "@/shared/components/AvatarUploader";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
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
      <NameInput
        className="mt-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={inputErrors.name}
        disabled={loading}
      />
      <DescriptionInput
        className="mt-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={inputErrors.description}
        disabled={loading}
      />
      <Button
        className="w-100 mt-2 h-10 text-md cursor-pointer hover:scale-98 focus:scale-98 focus:bg-primary/80"
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

const NameInput = ({
  value,
  onChange,
  error,
  disabled,
  className,
}: InputFieldProps) => {
  return (
    <>
      <label htmlFor="email" className="sr-only">
        Email
      </label>

      <Input
        type="email"
        id="email"
        className={"w-100 h-10 hover:shadow " + className}
        placeholder="Enter Organization Name"
        value={value}
        disabled={disabled}
        onChange={onChange}
        aria-invalid={error ? true : false}
        aria-describedby={error ? "emailDescription" : undefined}
      />

      {error && (
        <p
          id="emailDescription"
          className="w-100 text-xs text-destructive mt-1"
        >
          {error}
        </p>
      )}
    </>
  );
};

const DescriptionInput = ({
  value,
  onChange,
  error,
  disabled,
  className,
}: InputFieldProps) => {
  return (
    <>
      <label htmlFor="email" className="sr-only">
        Email
      </label>

      <Textarea
        id="email"
        className={"w-100 h-40 hover:shadow " + className}
        placeholder="Enter Organization Description"
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={error ? true : false}
        aria-describedby={error ? "emailDescription" : undefined}
      />

      {error && (
        <p
          id="emailDescription"
          className="w-100 text-xs text-destructive mt-1"
        >
          {error}
        </p>
      )}
    </>
  );
};
export default AddOrganization;
