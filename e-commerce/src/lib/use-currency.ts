// src/lib/use-currency.ts
import { useLanguage } from "@/features/language/context/LanguageContext"
import { formatPrice } from "./currency"

export function useCurrency() {
  const { language } = useLanguage()
  return {
    format: (amount: number | string) => formatPrice(amount, language),
  }
}