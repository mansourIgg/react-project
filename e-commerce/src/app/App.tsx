// src/app/App.tsx
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { AuthProvider } from "@/features/auth/context/AuthContext"
import { CartProvider } from "@/features/cart/context/CartContext"
import { Toaster } from "@/components/ui/sonner"
import { LanguageProvider } from "@/features/language/context/LanguageContext"

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <LanguageProvider>
          <RouterProvider router={router} />
          <Toaster richColors position="top-center" />
        </LanguageProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App