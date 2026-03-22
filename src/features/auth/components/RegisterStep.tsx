import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import PasswordField from "./ui/Password";

import { toast } from "sonner";
import type { InputFieldProps } from "..";
import { useAuthStore } from "../../../providers/user";
import { registerUser } from "../apis";

interface InputErrors {
  name?: string;
  password?: string;
}

const validate = (name: string, password: string) => {
  const errors: InputErrors = {};

  if (!name) {
    errors.name = "Name is required";
  } else if (name.trim().length < 3) {
    errors.name = "Name must contain three letters";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

const RegisterStep = ({
  token,
  afterRegister,
}: {
  token: string;
  afterRegister: () => void;
}) => {
  const { setUser } = useAuthStore.getState();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [inputErrors, setInputErrors] = useState<InputErrors>({});

  const onSubmit = async () => {
    setLoading(true);
    const errors = validate(name, password);
    setInputErrors(errors);
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }

    const res = await registerUser(name, password, token);

    if (res.success) {
      if (res.data) setUser(res.data.user);
      afterRegister();
    } else {
      toast.error(res.error);
    }

    setLoading(false);
  };

  return (
    <>
      <Header />

      <NameField
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={inputErrors.name}
        disabled={loading}
      />

      <PasswordField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={inputErrors.password}
        disabled={loading}
      />

      {/* Submit Button */}
      <Button
        className="w-80 mt-2 h-10 text-md cursor-pointer hover:scale-98 focus:scale-98 focus:bg-primary/80"
        onClick={onSubmit}
        disabled={loading}
      >
        Get Registered!
      </Button>

      <Footer />
    </>
  );
};

const Header = () => {
  return (
    <>
      <h2 className="text-xl font-bold text-foreground w-80 text-start">
        Complete Registeration
      </h2>
      <p className="w-80 text-sm text-secondary-foreground">
        Fill in the following information to complete you registeration process.
      </p>
    </>
  );
};

const NameField = ({ value, onChange, error, disabled }: InputFieldProps) => {
  return (
    <>
      <label htmlFor="name" className="sr-only">
        Name
      </label>
      <Input
        type="text"
        id="name"
        className="w-80 mt-12 h-10 hover:shadow"
        placeholder="Enter your Name"
        value={value}
        onChange={onChange}
        aria-invalid={error ? true : false}
        aria-describedby={error ? "nameDescription" : undefined}
        disabled={disabled}
      />
      {error && (
        <p id="nameDescription" className="w-80 text-xs text-destructive mt-1">
          {error}
        </p>
      )}
    </>
  );
};

const Footer = () => {
  return (
    <>
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
    </>
  );
};

export default RegisterStep;
