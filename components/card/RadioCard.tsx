import { Label } from "../ui/label";
import { RadioGroupItem } from "../ui/radio-group";

function RadioCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="w-full">
      <RadioGroupItem value={value} id={value} className="peer sr-only" />
      <Label
        htmlFor={value}
        className="
          flex items-center justify-center
          rounded-md border bg-white px-4 py-3
          text-sm font-medium cursor-pointer select-none
          transition
          hover:border-primary/60
          peer-data-[state=checked]:border-primary
          peer-data-[state=checked]:ring-2
          peer-data-[state=checked]:ring-primary/20
        "
      >
        {label}
      </Label>
    </div>
  );
}

export default RadioCard