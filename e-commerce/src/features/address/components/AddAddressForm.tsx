// src/features/address/components/AddAddressForm.tsx
import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormTextField } from "@/components/common/FormTextField"
import { addAddressSchema, type AddAddressFormValues } from "../schemas/address.schema"
import { locationService } from "../services/location.service"
import { addressService } from "../services/address.service"
import { useAuth } from "@/features/auth/context/AuthContext"
import { ApiError } from "@/lib/api-response"
import { phoneCountries } from "@/lib/phone-countries"
import type { Region, City } from "../types/location.types"

export function AddAddressForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [regions, setRegions] = useState<Region[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [isLoadingRegions, setIsLoadingRegions] = useState(false)
  const [isLoadingCities, setIsLoadingCities] = useState(false)

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<AddAddressFormValues>({
    resolver: zodResolver(addAddressSchema),
    defaultValues: {
      countryId: "SA",
      firstName: "",
      lastName: "",
      street: "",
      regionId: "",
      cityId: "",
      postcode: "",
      telephone: "",
      shortAddress: "",
    },
  })

  const selectedCountryId = watch("countryId")
  const selectedRegionId = watch("regionId")

  // Fetch regions whenever the selected country changes
  useEffect(() => {
    if (!selectedCountryId) return
    setIsLoadingRegions(true)
    setValue("regionId", "")
    setValue("cityId", "")
    setCities([])
    locationService
      .getRegions(selectedCountryId)
      .then((data) => setRegions(data.available_regions ?? []))
      .catch(() => {
        setRegions([])
        toast.error(t("common.somethingWentWrong"))
      })
      .finally(() => setIsLoadingRegions(false))
  }, [selectedCountryId, setValue, t])

  // Fetch cities whenever the selected region changes
  useEffect(() => {
    if (!selectedRegionId) {
      setCities([])
      return
    }
    setIsLoadingCities(true)
    setValue("cityId", "")
    locationService
      .getCities(selectedRegionId)
      .then((data) => setCities(data.city ?? []))
      .catch(() => {
        setCities([])
        toast.error(t("common.somethingWentWrong"))
      })
      .finally(() => setIsLoadingCities(false))
  }, [selectedRegionId, setValue, t])

  const onSubmit = async (values: AddAddressFormValues) => {
    if (!user) return

    const region = regions.find((r) => r.id === values.regionId)
    const city = cities.find((c) => c.city_id === values.cityId)

    try {
      await addressService.saveAddress({
        customer_id: Number(user.customer_id),
        firstname: values.firstName,
        lastname: values.lastName,
        street: values.street,
        city: city?.default_name ?? "",
        city_id: Number(values.cityId),
        region_id: Number(values.regionId),
        region: region?.name ?? "",
        country_id: values.countryId,
        postcode: values.postcode,
        telephone: values.telephone,
        short_adress: values.shortAddress,
        latitude: "",
        longitude: "",
        building_number: "",
        floor_apartment: "",
        customer_type_address: "",
        apartment_no: "",
        address_location: "",
        special_marque: "",
        default_billing: 0,
        default_shipping: 1,
      })
      toast.success(t("address.saved"))
      navigate("/addresses", { replace: true })
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : t("common.somethingWentWrong"))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Country */}
      <div className="flex flex-col gap-1.5">
        <Label>{t("address.country")}</Label>
        <Controller
          control={control}
          name="countryId"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder={t("address.selectCountry")} />
              </SelectTrigger>
              <SelectContent>
                {phoneCountries.map((c) => (
                  <SelectItem key={c.iso2} value={c.iso2}>
                    {c.flag} {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <FormTextField control={control} name="firstName" label={t("auth.register.firstName")} placeholder="John" />
      <FormTextField control={control} name="lastName" label={t("auth.register.lastName")} placeholder="Doe" />
      <FormTextField control={control} name="street" label={t("address.street")} placeholder="Makkah St." />

      {/* Region */}
      <div className="flex flex-col gap-1.5">
        <Label>{t("address.region")}</Label>
        <Controller
          control={control}
          name="regionId"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange} disabled={isLoadingRegions}>
              <SelectTrigger>
                <SelectValue placeholder={isLoadingRegions ? undefined : t("address.selectRegion")}>
                  {isLoadingRegions && (
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="size-4 animate-spin" />
                      {t("common.loading")}
                    </span>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.id} value={region.id}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* City */}
      <div className="flex flex-col gap-1.5">
        <Label>{t("address.city")}</Label>
        <Controller
          control={control}
          name="cityId"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={!selectedRegionId || isLoadingCities}
            >
              <SelectTrigger>
                <SelectValue placeholder={isLoadingCities ? undefined : t("address.selectCity")}>
                  {isLoadingCities && (
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="size-4 animate-spin" />
                      {t("common.loading")}
                    </span>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.city_id} value={city.city_id}>
                    {city.default_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <FormTextField control={control} name="postcode" label={t("address.postcode")} placeholder="12" />
      <FormTextField control={control} name="telephone" label={t("address.telephone")} type="tel" placeholder="0790325612" />
      <FormTextField control={control} name="shortAddress" label={t("address.shortAddress")} placeholder="4234ssss" />

      <Button type="submit" disabled={isSubmitting} className="mt-2">
        {isSubmitting ? t("address.saving") : t("address.save")}
      </Button>
    </form>
  )
}