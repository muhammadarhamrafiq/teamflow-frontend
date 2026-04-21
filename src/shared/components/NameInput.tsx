import type { InputFieldProps } from "@/app";
import { Input } from "./ui/input";

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

export default NameField;
