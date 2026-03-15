import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../components/ui/input-group";

import { EyeIcon, EyeOff } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface InputErrors {
  name?: string;
  password?: string;
}

const RegisterStep = ({ afterRegister }: { afterRegister: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [inputErrors, setInputErrors] = useState<InputErrors>({});
  const [passwordVisible, setPasswordVisible] = useState(false);

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

  const onSubmit = async () => {
    setLoading(true);
    const errors = validate(name, password);
    setInputErrors(errors);
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }

    setLoading(false);
    afterRegister();
  };

  return (
    <>
      <h2 className="text-xl font-bold text-foreground w-80 text-start">
        Complete Registeration
      </h2>
      <p className="w-80 text-sm text-secondary-foreground">
        Fill in the following information to complete you registeration process.
      </p>
      {/* Name Field */}
      <label htmlFor="name" className="sr-only">
        Name
      </label>
      <Input
        type="text"
        id="name"
        className="w-80 mt-12 h-10 hover:shadow"
        placeholder="Enter your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-invalid={inputErrors.name ? true : false}
        aria-describedby={inputErrors.name ? "nameDescription" : undefined}
      />
      {inputErrors.name && (
        <p id="nameDescription" className="w-80 text-xs text-destructive mt-1">
          {inputErrors.name}
        </p>
      )}
      {/* Password Field */}
      <label htmlFor="password" className="sr-only"></label>
      <InputGroup className="w-80 h-10 mt-2">
        <InputGroupInput
          id="password"
          type={passwordVisible ? "text" : "password"}
          placeholder="Enter a Password"
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={inputErrors.password ? true : false}
          aria-describedby={
            inputErrors.password ? "passwordDescription" : undefined
          }
        />
        <InputGroupAddon align="inline-end">
          <HugeiconsIcon
            icon={passwordVisible ? EyeOff : EyeIcon}
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="cursor-pointer"
          />
        </InputGroupAddon>
      </InputGroup>
      {inputErrors.password && (
        <p
          id="passwordDescription"
          className="w-80 text-xs text-destructive mt-1"
        >
          {inputErrors.password}
        </p>
      )}
      {/* Submit Button */}
      <Button
        className="w-80 mt-2 h-10 text-md cursor-pointer hover:scale-98 focus:scale-98 focus:bg-primary/80"
        onClick={onSubmit}
        disabled={loading}
      >
        Get Registered!
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
    </>
  );
};

export default RegisterStep;
