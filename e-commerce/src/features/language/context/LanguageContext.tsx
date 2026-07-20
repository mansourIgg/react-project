// src/features/language/context/LanguageContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useTranslation } from "react-i18next"
import type { SupportedLanguage } from "@/lib/i18n"
import { languageStorage } from "../services/language.storage"

interface LanguageContextValue {
  language: SupportedLanguage
  setLanguage: (lang: SupportedLanguage) => void
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

function applyDocumentDirection(lang: SupportedLanguage) {
  document.documentElement.lang = lang
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation()
  const [language, setLanguageState] = useState<SupportedLanguage>("en")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    languageStorage.get().then((cached) => {
      const initial = cached ?? "en"
      i18n.changeLanguage(initial)
      applyDocumentDirection(initial)
      setLanguageState(initial)
      setIsLoading(false)
    })
  }, [i18n])

  const setLanguage = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang)
    applyDocumentDirection(lang)
    languageStorage.set(lang)
    setLanguageState(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isLoading }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}