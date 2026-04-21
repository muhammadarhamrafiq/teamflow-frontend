import EmailInput from "@/shared/components/Email";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { updateEmail } from "../utils/apis";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const UpdateEmail = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState<string>();
  const [success, setSuccess] = useState(false);

  const onSubmit = async () => {
    if (loading) return;

    if (!EMAIL_REGEX.test(email)) {
      setInputError("Valid Email is required");
      return;
    }

    setLoading(true);

    const res = await updateEmail(email);
    if (res.error) {
      toast.error(res.error || "Something went wrong");
      setLoading(false);
      return;
    }

    setSuccess(true);
  };

  if (success) return <SuccessMessage />;

  return (
    <div className="flex flex-col items-center py-20">
      <h2 className="w-80 text-lg font-semibold">Update your Email</h2>
      <p className="w-80 text-accent-foreground text-xs">
        Enter the new email address to initiate the updation process
      </p>
      <EmailInput
        className="mt-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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

const SuccessMessage = () => {
  return (
    <div className="w-80 mx-auto py-10 md:py-30">
      <h2 className="font-bold text-lg">Email Update Requested</h2>
      <p className="text-sm">
        Your Request for the email update has been processed verify your updated
        email by to complete the process
      </p>
      <Link
        to="/profile"
        className="block mt-2 text-sm hover:text-primary hover:underline text-center w-full"
      >
        Go Back
      </Link>
    </div>
  );
};

export default UpdateEmail;
