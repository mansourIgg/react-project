// src/components/common/Header.tsx
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Home, User, ShoppingCart, Globe } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useCart } from "@/features/cart/context/CartContext"
import { useAuth } from "@/features/auth/context/AuthContext"
import { useLanguage } from "@/features/language/context/LanguageContext"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LoginRequiredDialog } from "./LoginRequiredDialog"

export function Header() {
  const { totalItems } = useCart()
  const { user } = useAuth()
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

  const isDashboard = pathname === "/dashboard"
  const isCart = pathname === "/cart"

  const handleProfileClick = () => {
    if (user) {
      navigate("/profile")
    } else {
      setLoginDialogOpen(true)
    }
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/dashboard" className="text-lg font-semibold">
          {t("common.appName")}
        </Link>

        <div className="flex items-center gap-2">
          {!isDashboard && (
            <Button variant="ghost" size="icon" asChild>
              <Link to="/dashboard" aria-label={t("common.home")}>
                <Home className="size-5" />
              </Link>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={handleProfileClick}
            aria-label={t("common.profile")}
          >
            <User className="size-5" />
          </Button>

          {!isCart && (
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link to="/cart" aria-label={t("common.cart")}>
                <ShoppingCart className="size-5" />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={t("common.language")}>
                <Globe className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setLanguage("en")}
                className={language === "en" ? "font-semibold" : ""}
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage("ar")}
                className={language === "ar" ? "font-semibold" : ""}
              >
                العربية
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <LoginRequiredDialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen} />
    </header>
  )
}