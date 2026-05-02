import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

type TextareaFormProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  description?: string;
};

export function TextareaForm<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  description,
}: TextareaFormProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="w-full">
          <Field>
            <FieldLabel>{label}</FieldLabel>
            <Textarea {...field} placeholder={placeholder} className="w-full min-h-120px resize-y" />
            {description && <p className="text-sm text-muted-foreground">{description}</p>}

            {fieldState.error && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>

        </div>

      )}
    />
  );
}