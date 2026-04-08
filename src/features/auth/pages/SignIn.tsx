import { useAuthStore } from "@/app/providers/user";
import Logo from "@/shared/assets/icons/Logo";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import EmailInput from "../components/ui/Email";
import PasswordField from "../components/ui/Password";
import { requestSignIn } from "../utils/apis";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface InputErrors {
  email?: string;
  password?: string;
}

const validate = (email: string, password: string) => {
  const errors: InputErrors = {};

  const validEmail = EMAIL_REGEX.test(email);
  if (!validEmail) errors.email = "Valid Email is required";

  if (password.length < 1) errors.password = "Password is required";

  return errors;
};

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputErrors, setInputErrors] = useState<InputErrors>({});
  const setUser = useAuthStore((state) => state.setUser);

  const navigate = useNavigate();

  const onSubmit = async () => {
    setLoading(true);
    const errors = validate(email, password);
    setInputErrors(errors);

    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }

    const res = await requestSignIn(email, password);
    if (res.success) {
      const data = res.data!;
      toast.success(data.message);
      setUser(data.user);
      navigate("/dashboard", {
        viewTransition: true,
      });
    } else {
      toast.error(res.error);
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <EmailInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        error={inputErrors.email}
      />

      <PasswordField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        error={inputErrors.password}
      />

      <Button
        className="w-80 mt-2 h-10 text-md cursor-pointer hover:scale-98 focus:scale-98 focus:bg-primary/80"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? "Sending..." : "Login"}
      </Button>
      <Link
        to="/account/forgot-password"
        className="text-sm mt-2 hover:underline hover:text-primary"
      >
        Forgot Password
      </Link>

      <Footer />
    </>
  );
};

const Header = () => {
  return (
    <>
      <Logo size={60} />
      <h1 className="text-4xl font-bold text-foreground">Teamflow</h1>
      <p className="w-80 mt-4 text-sm text-center text-secondary-foreground">
        Welcome back to teamflow. SignIn to your account.
      </p>
    </>
  );
};

const Footer = () => {
  return (
    <p className="mt-8 text-xs">
      Don't have an account?
      <Link
        className="text-primary hover:text-foreground hover:underline"
        to="/account/register"
      >
        {" "}
        Sign Up
      </Link>
    </p>
  );
};

export default SignIn;
