import type { InputFieldProps } from "@/app";
import { Search } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState, type ChangeEvent } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

const SearchBar = ({ value, onChange, className }: InputFieldProps) => {
  const [localValue, setLocalValue] = useState(value ?? "");

  useEffect(() => {
    setLocalValue(value ?? "");
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue === value) return;

      onChange({
        target: { value: localValue } as EventTarget & HTMLInputElement,
        currentTarget: { value: localValue } as EventTarget & HTMLInputElement,
      } as ChangeEvent<HTMLInputElement>);
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, onChange, value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  return (
    <InputGroup className={className}>
      <InputGroupInput
        placeholder="search"
        value={localValue}
        onChange={handleChange}
      />
      <InputGroupAddon>
        <HugeiconsIcon icon={Search} />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchBar;
