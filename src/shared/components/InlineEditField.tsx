import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface InlineEditFieldProps {
  value: string;
  disabled?: boolean;
  error?: string | boolean;
  className?: string;
  variant?: "INPUT" | "TEXTAREA";
  onSave: (value: string) => void;
}

const InlineEditField = ({
  value,
  disabled,
  error,
  className,
  onSave,
  variant = "INPUT",
}: InlineEditFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);

  const handleSave = () => {
    setIsEditing(false);
    if (text !== value) onSave(text);
  };

  return (
    <>
      <div className={className}>
        {isEditing ? (
          <>
            {variant === "INPUT" ? (
              <Input
                autoFocus
                disabled={disabled}
                value={text}
                aria-invalid={error ? true : false}
                aria-describedby={error ? "passwordDescription" : undefined}
                onBlur={handleSave}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key == "Enter" && handleSave()}
              />
            ) : (
              <Textarea
                autoFocus
                disabled={disabled}
                value={text}
                aria-invalid={error ? true : false}
                aria-describedby={error ? "passwordDescription" : undefined}
                onBlur={handleSave}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key == "Enter" && handleSave()}
              />
            )}
          </>
        ) : (
          <span onClick={() => !disabled && setIsEditing(true)}>
            {value || "Click to edit"}
          </span>
        )}
      </div>
      {error && (
        <p
          id="passwordDescription"
          className="w-80 text-xs text-destructive mt-1 block"
        >
          {error}
        </p>
      )}
    </>
  );
};

export default InlineEditField;
