import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import EmailInput from "../components/ui/Email";
import HeaderWithLogo from "../components/ui/HeaderWithLogo";
import PasswordField from "../components/ui/Password";
import { forgotPassword, resetPassword } from "../utils/apis";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ForgotPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const step = token ? "Reset" : "Email";

  return (
    <>
      {step === "Email" && <EmailStep />}
      {step === "Reset" && token && <ResetStep token={token} />}
    </>
  );
};

const EmailStep = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async () => {
    setLoading(false);
    setError(undefined);

    const valid = EMAIL_REGEX.test(email);
    if (!valid) {
      setLoading(false);
      setError("Valid Email is required");
      return;
    }

    const res = await forgotPassword(email);
    if (res.error) {
      setLoading(false);
      toast.error(res.error ?? "Something went wrong");
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success)
    return (
      <>
        <Logo size={60} />
        <h1 className="text-4xl font-bold text-foreground">Teamflow</h1>

        <p className="w-80 mt-4 text-sm text-center text-secondary-foreground">
          Check your inbox to proceed further. If you have any query feel free
          to to{" "}
          <Link
            className="text-primary hover:text-foreground hover:underline"
            to="/contact-us"
          >
            Contact Us
          </Link>
        </p>
      </>
    );

  return (
    <>
      <HeaderWithLogo description="Forgot Password? Don't worry you can still recover your account by your email." />

      <EmailInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        error={error}
      />
      <Button
        className="w-80 mt-2 h-10 text-md cursor-pointer hover:scale-98 focus:scale-98 focus:bg-primary/80"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? "Sending..." : "Proceed"}
      </Button>
    </>
  );
};

const ResetStep = ({ token }: { token: string }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const navigate = useNavigate();

  const onSubmit = async () => {
    setLoading(false);
    setError(
      password.length < 6
        ? "Password must contain atleast 6 characters"
        : undefined,
    );
    if (error) return;

    const res = await resetPassword(token, password);
    if (res.error) {
      setLoading(false);
      toast.error(res.error ?? "Something went wrong");
      return;
    }

    toast.success(res.data.message);
    setLoading(true);

    navigate("/account/login");
  };

  return (
    <>
      <HeaderWithLogo description="Just last step. Enter your new password for your account." />

      <PasswordField
        className="mt-12"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        error={error}
      />
      <Button
        className="w-80 mt-2 h-10 text-md cursor-pointer hover:scale-98 focus:scale-98 focus:bg-primary/80"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? "Sending..." : "Reset Password"}
      </Button>
    </>
  );
};

export default ForgotPassword;
