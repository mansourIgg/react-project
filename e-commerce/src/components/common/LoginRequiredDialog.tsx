// src/components/common/LoginRequiredDialog.tsx
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface LoginRequiredDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginRequiredDialog({ open, onOpenChange }: LoginRequiredDialogProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleLogin = () => {
    onOpenChange(false)
    navigate("/login")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("loginRequired.title")}</DialogTitle>
          <DialogDescription>{t("loginRequired.description")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("loginRequired.cancel")}
          </Button>
          <Button onClick={handleLogin}>{t("loginRequired.login")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}