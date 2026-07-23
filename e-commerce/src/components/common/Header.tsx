// src/components/common/Header.tsx
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Home, User, ShoppingCart, Globe, LogOut, MapPin, Package, Heart } from "lucide-react"
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
import { LogoutConfirmDialog } from "./LogoutConfirmDialog"
import { useTheme } from "next-themes"
import { Palette } from "lucide-react"
import { themes } from "@/lib/themes"

export function Header() {
  const { totalItems } = useCart()
  const { user, logout } = useAuth()
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  const isDashboard = pathname === "/dashboard"
  const isCart = pathname === "/cart"
  const isWishlist = pathname === "/wishlist"
  const isAddresses = pathname.startsWith("/addresses")

  const handleProfileClick = () => {
    if (user) {
      navigate("/profile")
    } else {
      setLoginDialogOpen(true)
    }
  }

  const handleConfirmLogout = () => {
    logout()
    setLogoutDialogOpen(false)
    navigate("/login", { replace: true })
  }

  const handleAddressesClick = () => {
  if (user) {
    navigate("/addresses")
  } else {
    setLoginDialogOpen(true)
  }
}

const handleWishlistClick = () => {
  if (user) {
    navigate("/wishlist")
  } else {
    setLoginDialogOpen(true)
  }
}

const handleOrdersClick = () => {
  // TODO: wire up orders page once available
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
              <Link to="/dashboard" aria-label={t("common.home")} title={t("common.home")}>
                <Home className="size-5" />
              </Link>
            </Button>
          )}

          <Button variant="ghost" size="icon" onClick={handleProfileClick} aria-label={t("common.profile")} title={t("common.profile")}>
            <User className="size-5" />
          </Button>
          
          {!isAddresses && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleAddressesClick}
              aria-label={t("common.addresses")}
              title={t("common.addresses")}
            >
              <MapPin className="size-5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleOrdersClick}
            aria-label={t("common.orders")}
            title={t("common.orders")}
          >
            <Package className="size-5" />
          </Button>

          {!isCart && (
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link to="/cart" aria-label={t("common.cart")} title={t("common.cart")}>
                <ShoppingCart className="size-5" />
                {totalItems > 0 && (
                  <span className="absolute -end-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>
          )}

          {!isWishlist && (
          <Button variant="ghost" size="icon" onClick={handleWishlistClick} aria-label={t("common.wishlist")} title={t("common.wishlist")}>
            <Heart className="size-5" />
          </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={t("common.language")} title={t("common.language")}>
                <Globe className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "font-semibold" : ""}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("ar")} className={language === "ar" ? "font-semibold" : ""}>
                العربية
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={t("common.theme")} title={t("common.theme")}>
              <Palette className="size-5" />
            </Button>
          </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {themes.map((t) => (
                <DropdownMenuItem
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={theme === t.id ? "font-semibold" : ""}
                >
                  {t.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {user && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLogoutDialogOpen(true)}
              aria-label={t("common.logout")}
            >
              <LogOut className="size-5" />
            </Button>
          )}
        </div>
      </div>

      <LoginRequiredDialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen} />
      <LogoutConfirmDialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
        onConfirm={handleConfirmLogout}
      />
    </header>
  )
}