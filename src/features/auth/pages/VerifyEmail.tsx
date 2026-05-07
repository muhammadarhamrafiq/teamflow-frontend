import Logo from "@/shared/assets/icons/Logo";
import { Button } from "@/shared/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { updateEmail } from "../utils/apis";

const VerifyEmail = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/account/register");
  }, [navigate, token]);

  async function updateEmailHandler() {
    if (loading) return;
    setLoading(true);

    const res = await updateEmail(token ?? "Invalid Token");

    setLoading(false);
    if (res.error) {
      toast.error(res.error || "Something went wrong");
      return;
    }

    toast.success("Email updated successfully now you can login");
    navigate("/account/login");
  }

  return (
    <>
      <Logo size={60} />
      <h1 className="text-4xl font-bold text-foreground">Teamflow</h1>

      <p className="w-80 mt-4 text-sm text-center text-secondary-foreground">
        Welcome back to teamflow. To complete you email update process click the
        button below.
        <Button
          className="w-80 mt-2 h-10 text-md cursor-pointer hover:scale-98 focus:scale-98 focus:bg-primary/80"
          disabled={loading}
          onClick={updateEmailHandler}
        >
          Update Email
        </Button>
      </p>
    </>
  );
};

export default VerifyEmail;
