// src/features/dashboard/services/dashboard.service.ts
import { apiRequest } from "@/lib/api-client"
import type { HomePageApiData } from "../types/dashboard-api.types"

export const dashboardService = {
  getHomePage: () => apiRequest<HomePageApiData>({ method: "GET", url: "/V2/api/homePage" }),
}