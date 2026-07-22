// src/pages/product/ProductDetailPage.tsx
import { useParams } from "react-router-dom"
import { Header } from "@/components/common/Header"

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <>
      <Header />
      <div className="flex flex-col gap-4 px-6 py-6">
        <p className="text-muted-foreground">Product detail page — coming soon (id: {id})</p>
      </div>
    </>
  )
}