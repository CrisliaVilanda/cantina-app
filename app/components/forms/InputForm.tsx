import { Controller, Control, FieldValues, Path } from "react-hook-form";

type InputFormProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  description?: string;
};

export function InputForm<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  description,
}: InputFormProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col space-y-1 w-full">
          {/* Label */}
          <label className="text-sm font-medium">
            {label}
          </label>

          {/* Input */}
          <input
            {...field}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            className={`
              border px-3 py-2 rounded-md bg-sidebar-accent
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${fieldState.error ? "border-red-500" : "border-gray-300"}
            `}
          />

          {/* Error */}
          {fieldState.error && (
            <span className="text-red-500 text-xs">
              {fieldState.error.message}
            </span>
          )}

          {/* Description */}
          {description && !fieldState.error && (
            <span className="text-gray-500 text-xs">
              {description}
            </span>
          )}
        </div>
      )}
    />
  );
}