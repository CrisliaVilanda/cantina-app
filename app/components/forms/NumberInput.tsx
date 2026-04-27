import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";

type NumberInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
};

export function NumberInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
}: NumberInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col space-y-1 w-full">
          <label className="text-sm font-medium">
            {label}
          </label>

          <Input
            type="number"
            {...field}
            placeholder={placeholder}
            onChange={(e) => field.onChange(e.target.value)}
            aria-invalid={fieldState.invalid}
            className={`
              border px-3 py-2 rounded-md bg-sidebar-accent
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${fieldState.error ? "border-red-500" : "border-gray-300"}
            `}
          />

          {fieldState.error && (
            <span className="text-red-500 text-sm">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
}