import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { FormControl } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { SelectSingleEventHandler } from "react-day-picker";
import { cn, formatDate } from "@/lib/utils";

interface IProps {
  value: Date;
  onChange: SelectSingleEventHandler;
}

export function DatePicker(props: IProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "pl-3 text-left font-normal",
              !props.value && "text-muted-foreground"
            )}
          >
            {props.value ? (
              formatDate(props.value, "PPP")
            ) : (
              <span>Selecione uma data</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={props.value}
          onSelect={props.onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
