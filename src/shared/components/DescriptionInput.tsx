import { Textarea } from "./ui/textarea";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string | null;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

const DescriptionInput = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  className,
}: InputFieldProps) => {
  return (
    <>
      <label htmlFor="email" className="sr-only">
        {label}
      </label>

      <Textarea
        id="email"
        className={"w-80 h-40 hover:shadow " + className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={error ? true : false}
        aria-describedby={error ? "descDescription" : undefined}
      />

      {error && (
        <p id="descDescription" className="text-xs text-destructive mt-1">
          {error}
        </p>
      )}
    </>
  );
};

export default DescriptionInput;
