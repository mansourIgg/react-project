// src/lib/phone-countries.ts
export interface PhoneCountry {
  iso2: string
  name: string
  dialCode: string
  flag: string,
  nationalLength: number
}

export const phoneCountries: PhoneCountry[] = [
  { iso2: "SA", name: "Saudi Arabia", dialCode: "966", flag: "🇸🇦", nationalLength: 9 },
  { iso2: "AE", name: "United Arab Emirates", dialCode: "971", flag: "🇦🇪", nationalLength: 9 },
  { iso2: "EG", name: "Egypt", dialCode: "20", flag: "🇪🇬", nationalLength: 10 },
  { iso2: "KW", name: "Kuwait", dialCode: "965", flag: "🇰🇼", nationalLength: 8 },
  { iso2: "QA", name: "Qatar", dialCode: "974", flag: "🇶🇦", nationalLength: 8 },
  { iso2: "BH", name: "Bahrain", dialCode: "973", flag: "🇧🇭", nationalLength: 8 },
  { iso2: "OM", name: "Oman", dialCode: "968", flag: "🇴🇲", nationalLength: 8 },
  { iso2: "JO", name: "Jordan", dialCode: "962", flag: "🇯🇴", nationalLength: 9 },
  { iso2: "US", name: "United States", dialCode: "1", flag: "🇺🇸", nationalLength: 10 },
  { iso2: "GB", name: "United Kingdom", dialCode: "44", flag: "🇬🇧", nationalLength: 10 },
]