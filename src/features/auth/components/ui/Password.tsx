import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeIcon, EyeOff } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

import type { InputFieldProps } from "../../utils";

const PasswordField = ({
  value,
  onChange,
  error,
  disabled,
  className,
}: InputFieldProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <>
      <label htmlFor="password" className="sr-only"></label>
      <InputGroup className={"w-80 h-10 mt-2 " + className}>
        <InputGroupInput
          id="password"
          type={passwordVisible ? "text" : "password"}
          placeholder="Enter your Password"
          value={value}
          onChange={onChange}
          aria-invalid={error ? true : false}
          aria-describedby={error ? "passwordDescription" : undefined}
          disabled={disabled}
        />
        <InputGroupAddon align="inline-end">
          <HugeiconsIcon
            icon={passwordVisible ? EyeOff : EyeIcon}
            onClick={() => setPasswordVisible((prev) => !prev)}
            className="cursor-pointer"
          />
        </InputGroupAddon>
      </InputGroup>
      {error && (
        <p
          id="passwordDescription"
          className="w-80 text-xs text-destructive mt-1"
        >
          {error}
        </p>
      )}
    </>
  );
};

export default PasswordField;
