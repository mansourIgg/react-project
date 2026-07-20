// src/components/common/FormTextField.tsx
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FormTextFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  label: string
  type?: string
  placeholder?: string
  autoComplete?: string
}

export function FormTextField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
}: FormTextFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={name}>{label}</Label>
          <Input
            id={name}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className={cn(fieldState.error && "border-destructive focus-visible:ring-destructive")}
            {...field}
          />
          {fieldState.error && (
            <p className="text-sm text-destructive">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  )
}