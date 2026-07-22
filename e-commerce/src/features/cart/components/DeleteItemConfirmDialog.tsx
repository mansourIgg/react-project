// src/features/cart/components/DeleteItemConfirmDialog.tsx
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

interface DeleteItemConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeleteItemConfirmDialog({ open, onOpenChange, onConfirm }: DeleteItemConfirmDialogProps) {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("cart.deleteConfirmTitle")}</DialogTitle>
          <DialogDescription>{t("cart.deleteConfirmDescription")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cart.deleteCancel")}
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {t("cart.deleteConfirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}