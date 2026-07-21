// src/components/common/PhoneField.tsx
import { Controller, type Control, type FieldValues, type Path, useWatch } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { phoneCountries } from "@/lib/phone-countries"

interface PhoneFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  countryName: Path<TFieldValues>
  numberName: Path<TFieldValues>
  label: string
}

export function PhoneField<TFieldValues extends FieldValues>({
  control,
  countryName,
  numberName,
  label,
}: PhoneFieldProps<TFieldValues>) {
  const selectedCountryCode = useWatch({ control, name: countryName })
  const selectedCountry = phoneCountries.find((c) => c.iso2 === selectedCountryCode)
  const maxLength = selectedCountry?.nationalLength ?? 15

  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Controller
          control={control}
          name={countryName}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-[110px] shrink-0">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                {phoneCountries.map((c) => (
                  <SelectItem key={c.iso2} value={c.iso2}>
                    {c.flag} +{c.dialCode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <Controller
          control={control}
          name={numberName}
          render={({ field, fieldState }) => (
            <Input
              type="tel"
              inputMode="numeric"
              placeholder="5XXXXXXXX"
              maxLength={maxLength}
              className={cn("flex-1", fieldState.error && "border-destructive focus-visible:ring-destructive")}
              {...field}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, maxLength)
                field.onChange(digitsOnly)
              }}
            />
          )}
        />
      </div>
      <Controller
        control={control}
        name={numberName}
        render={({ fieldState }) =>
          fieldState.error ? <p className="text-sm text-destructive">{fieldState.error.message}</p> : <></>
        }
      />
    </div>
  )
}