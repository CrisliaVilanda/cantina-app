import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { Input } from "@/components/ui/input";

type CurrencyInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
};

export function CurrencyInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
}: CurrencyInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col space-y-1 w-full">
          <label className="text-sm font-medium">
            {label}
          </label>

          <NumericFormat
            value={field.value}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            decimalScale={2}
            fixedDecimalScale
            customInput={Input}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            className={`
              border px-3 py-2 rounded-md bg-sidebar-accent
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${fieldState.error ? "border-red-500" : "border-gray-300"}
            `}
            onValueChange={(values) => field.onChange(values.value)}
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