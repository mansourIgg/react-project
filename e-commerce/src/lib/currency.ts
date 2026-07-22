// src/lib/currency.ts
import type { SupportedLanguage } from "./i18n"

const CURRENCY_LABELS: Record<SupportedLanguage, string> = {
  en: "SAR",
  ar: "ريال",
}

export function getCurrencyLabel(language: SupportedLanguage): string {
  return CURRENCY_LABELS[language]
}

export function formatPrice(amount: number | string, language: SupportedLanguage): string {
  const numeric = typeof amount === "string" ? parseFloat(amount) : amount
  const formatted = Number.isNaN(numeric) ? "0.00" : numeric.toFixed(2)
  return `${formatted} ${getCurrencyLabel(language)}`
}