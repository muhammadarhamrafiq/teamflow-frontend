import clsx from "clsx";
import { Input } from "./ui/input";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

const InputField = ({
  label,
  value,
  onChange,
  error,
  disabled,
  placeholder,
  className,
}: InputFieldProps) => {
  return (
    <>
      <label htmlFor="name" className="sr-only">
        {label}
      </label>
      <Input
        type="text"
        id="name"
        className={clsx("w-80 h-10 hover:shadow", className)}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={error ? true : false}
        aria-describedby={error ? "inputDescription" : undefined}
        disabled={disabled}
      />
      {error && (
        <p id="inputDescription" className="text-xs text-destructive mt-1">
          {error}
        </p>
      )}
    </>
  );
};

export default InputField;
