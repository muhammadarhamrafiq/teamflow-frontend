import { useState } from "react";
import { Link } from "react-router";
import Logo from "../../../assets/icons/Logo";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

const SuccessMessage = () => {
  return (
    <>
      <Logo size={60} />
      <h1 className="text-4xl font-bold text-foreground">Teamflow</h1>
      <p className="w-80 mt-4 text-sm text-center text-secondary-foreground">
        We are excited to for you to take you on our platform. Check you inbox
        to complete you registeration process. If you have any queries or
        problems please feel free to{" "}
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

const EmailStep = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [successfull, setSuccessfull] = useState(false);

  const onSubmit = async () => {
    /**
     * Validate the email and show if errors
     * send the request to the server and display the response
     * if the response is successfull the display the message to check the inbox;
     */
    setLoading(true);
    setEmailError(false);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validEmail = emailRegex.test(email);
    if (!validEmail) {
      setEmailError(true);
      setLoading(false);
      return;
    }

    setSuccessfull(true);
    setLoading(false);
  };

  if (successfull) return <SuccessMessage />;

  return (
    <>
      <Logo size={60} />
      <h1 className="text-4xl font-bold text-foreground">Teamflow</h1>
      <p className="w-80 mt-4 text-sm text-center text-secondary-foreground">
        Welcome to Teamflow and start managing your task and projects with us.
      </p>
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      <Input
        type="email"
        id="email"
        className="w-80 mt-12 h-10 hover:shadow"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={emailError}
        aria-describedby={emailError ? "emailDescription" : undefined}
        onKeyDownCapture={(e) => {
          if (e.key === "Enter") onSubmit();
        }}
      />
      {emailError && (
        <p id="emailDescription" className="w-80 text-xs text-destructive mt-1">
          Valid email is required
        </p>
      )}
      <Button
        className="w-80 mt-2 h-10 text-md cursor-pointer hover:scale-98 focus:scale-98 focus:bg-primary/80"
        onClick={onSubmit}
        disabled={loading}
      >
        Get Started
      </Button>
      <p className="w-80 mt-4 text-xs text-center text-secondary-foreground">
        By continuing you'r agreeing to our
        <Link
          className="text-primary hover:text-foreground hover:underline"
          to="/term-and-conditions"
        >
          Terms and Conditions{" "}
        </Link>
        and
        <Link
          className="text-primary hover:text-foreground hover:underline"
          to="/privacy-policy"
        >
          {" "}
          Privacy Policy
        </Link>
      </p>
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
    </>
  );
};

export default EmailStep;
