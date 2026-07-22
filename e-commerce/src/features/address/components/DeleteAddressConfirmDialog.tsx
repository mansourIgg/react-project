// src/features/address/components/DeleteAddressConfirmDialog.tsx
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

interface DeleteAddressConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeleteAddressConfirmDialog({ open, onOpenChange, onConfirm }: DeleteAddressConfirmDialogProps) {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("address.deleteConfirmTitle")}</DialogTitle>
          <DialogDescription>{t("address.deleteConfirmDescription")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("address.deleteCancel")}
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {t("address.deleteConfirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}