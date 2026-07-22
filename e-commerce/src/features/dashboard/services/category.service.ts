// src/features/dashboard/services/category.service.ts
import { apiRequest } from "@/lib/api-client"
import type { CategoryProductsResponse } from "../types/product-api.types"

interface GetCategoryProductsParams {
  categoryId: string
  page: number
  customerId: number
  pageSize?: number
}

export const categoryService = {
  getCategoryProducts: ({ categoryId, page, customerId, pageSize = 20 }: GetCategoryProductsParams) =>
    apiRequest<CategoryProductsResponse>({
      method: "GET",
      url: "/V1/mobiconnect/catalog/getCategoryProducts/",
      params: {
        "searchCriteria[filter_groups][0][filters][0][field]": "category_id",
        "searchCriteria[filter_groups][0][filters][0][value]": categoryId,
        "searchCriteria[filter_groups][0][filters][0][condition_type]": "eq",
        "searchCriteria[pageSize]": pageSize,
        "searchCriteria[currentPage]": page,
        "searchCriteria[sortOrders][0][field]": "position",
        "searchCriteria[sortOrders][0][direction]": "DESC",
        customer_id: customerId,
      },
    }),
}