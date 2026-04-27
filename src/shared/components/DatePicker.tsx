import { format } from "date-fns";

import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Calendar01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import clsx from "clsx";

interface DatePickerProps {
  date: Date | null;
  onChange: (date: Date | null) => void;
  className?: string;
  error?: string;
}

function DatePicker({ date, onChange, className, error }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className={clsx(
            "w-80  h-10 justify-start text-left font-normal data-[empty=true]:text-muted-foreground",
            className,
            error ? "border-destructive" : "",
          )}
        >
          <HugeiconsIcon icon={Calendar01Icon} />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date ? date : undefined}
          onSelect={(date) => onChange(date || null)}
        />
      </PopoverContent>
      {error && <span className="text-xs text-destructive mt-1">{error}</span>}
    </Popover>
  );
}

export default DatePicker;
