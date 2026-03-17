import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import Logo from "../../../assets/icons/Logo";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { submitEmail } from "../apis";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const EmailStep = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async () => {
    setEmailError(false);

    if (!EMAIL_REGEX.test(email)) {
      setEmailError(true);
      return;
    }

    setLoading(true);

    const response = await submitEmail(email);
    if (response.success) {
      setSuccess(true);
    } else {
      toast.error(response.error);
    }
    setLoading(false);
  };

  if (success) return <SuccessMessage />;

  return (
    <>
      <Header />

      <EmailInput
        value={email}
        hasError={emailError}
        disabled={loading}
        onChange={(e) => setEmail(e.target.value)}
        onSubmit={onSubmit}
      />

      <Button
        className="w-80 mt-2 h-10 text-md cursor-pointer hover:scale-98 focus:scale-98 focus:bg-primary/80"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? "Sending..." : "Get Started"}
      </Button>

      <p className="w-80 mt-4 text-xs text-center text-secondary-foreground">
        By continuing you're agreeing to our{" "}
        <Link
          className="text-primary hover:text-foreground hover:underline"
          to="/term-and-conditions"
        >
          Terms and Conditions
        </Link>{" "}
        and{" "}
        <Link
          className="text-primary hover:text-foreground hover:underline"
          to="/privacy-policy"
        >
          Privacy Policy
        </Link>
      </p>

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
        Welcome to Teamflow and start managing your task and projects with us.
      </p>
    </>
  );
};

interface EmailInputProps {
  value: string;
  hasError: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const EmailInput = ({
  value,
  hasError,
  disabled,
  onChange,
  onSubmit,
}: EmailInputProps) => {
  return (
    <>
      <label htmlFor="email" className="sr-only">
        Email
      </label>

      <Input
        type="email"
        id="email"
        className="w-80 mt-12 h-10 hover:shadow"
        placeholder="Enter your email"
        value={value}
        disabled={disabled}
        onChange={onChange}
        aria-invalid={hasError}
        aria-describedby={hasError ? "emailDescription" : undefined}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit();
        }}
      />

      {hasError && (
        <p id="emailDescription" className="w-80 text-xs text-destructive mt-1">
          Valid email is required
        </p>
      )}
    </>
  );
};

const Footer = () => {
  return (
    <p className="mt-8 text-xs">
      Already have an account?
      <Link
        className="text-primary hover:text-foreground hover:underline"
        to="/sign-in"
      >
        {" "}
        Sign In
      </Link>
    </p>
  );
};

const SuccessMessage = () => {
  return (
    <>
      <Logo size={60} />
      <h1 className="text-4xl font-bold text-foreground">Teamflow</h1>

      <p className="w-80 mt-4 text-sm text-center text-secondary-foreground">
        We are excited for you to join our platform. Check your inbox to
        complete your registration process. If you have any queries or problems
        please feel free to{" "}
        <Link
          className="text-primary hover:text-foreground hover:underline"
          to="/contact-us"
        >
          Contact Us
        </Link>
      </p>
    </>
  );
};

export default EmailStep;
