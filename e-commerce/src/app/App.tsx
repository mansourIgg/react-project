// src/app/App.tsx
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { AuthProvider } from "@/features/auth/context/AuthContext"
import { CartProvider } from "@/features/cart/context/CartContext"
import { LanguageProvider, useLanguage } from "@/features/language/context/LanguageContext"
import { Toaster } from "@/components/ui/sonner"

function AppRouter() {
  const { language } = useLanguage()
  return <RouterProvider router={router} key={language} />
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <LanguageProvider>
          <AppRouter />
          <Toaster richColors position="top-center" />
        </LanguageProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App