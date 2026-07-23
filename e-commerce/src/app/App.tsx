// src/app/App.tsx
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { AuthProvider } from "@/features/auth/context/AuthContext"
import { CartProvider } from "@/features/cart/context/CartContext"
import { LanguageProvider, useLanguage } from "@/features/language/context/LanguageContext"
import { Toaster } from "@/components/ui/sonner"
import { WishlistProvider } from "@/features/wishlist/context/WishlistContext"
import { ThemeProvider } from "next-themes"

function AppRouter() {
  const { language } = useLanguage()
  return <RouterProvider router={router} key={language} />
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" themes={["light", "dark", "rose"]}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <LanguageProvider>
              <AppRouter />
              <Toaster richColors position="top-center" />
            </LanguageProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App