import { useAuthStore } from "@/app/providers/user";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { resetPassword } from "../utils/apis";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useAuthStore.getState();

  const onSubmit = async () => {
    if (loading) return;

    setLoading(true);

    if (!user) return;

    const res = await resetPassword(user.email);
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
      <h2 className="w-80 text-lg font-semibold">Reset Password</h2>
      <p className="w-80 text-accent-foreground text-xs">
        Click the button below to initial the reset password request.
      </p>
      <Button
        className="w-80 mt-2 h-10 text-md cursor-pointer hover:scale-95 transition-transform"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? "Loading..." : "Request Reset"}
      </Button>
    </div>
  );
};

const SuccessMessage = () => {
  return (
    <div className="w-80 mx-auto py-10 md:py-30">
      <h2 className="font-bold text-lg">Reset Password Requested</h2>
      <p className="text-sm">
        Your Request for the password reset has been processed check your inbox
        to proceed further
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

export default ResetPassword;
