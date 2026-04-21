import type { InputFieldProps } from "@/app";
import { Input } from "@/shared/components/ui/input";

const EmailInput = ({
  value,
  error,
  disabled,
  onChange,
  className,
}: InputFieldProps) => {
  return (
    <>
      <label htmlFor="email" className="sr-only">
        Email
      </label>

      <Input
        type="email"
        id="email"
        className={"w-80 mt-12 h-10 hover:shadow " + className}
        placeholder="Enter your email"
        value={value}
        disabled={disabled}
        onChange={onChange}
        aria-invalid={error ? true : false}
        aria-describedby={error ? "emailDescription" : undefined}
      />

      {error && (
        <p id="emailDescription" className="w-80 text-xs text-destructive mt-1">
          {typeof error === "string" ? error : "Valid email is required"}
        </p>
      )}
    </>
  );
};

export default EmailInput;
