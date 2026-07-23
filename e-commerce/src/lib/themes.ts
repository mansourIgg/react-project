// src/lib/themes.ts
export const themes = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "rose", label: "Rose" }, // custom third theme
] as const

export type ThemeId = (typeof themes)[number]["id"]