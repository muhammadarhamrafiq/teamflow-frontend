import type { InputFieldProps } from "@/app";
import { Search } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

const SearchBar = ({ value, onChange, className }: InputFieldProps) => {
  return (
    <InputGroup className={className}>
      <InputGroupInput placeholder="search" value={value} onChange={onChange} />
      <InputGroupAddon>
        <HugeiconsIcon icon={Search} />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchBar;
