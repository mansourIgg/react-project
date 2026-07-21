// src/lib/api-client.ts
import axios from "axios"
import { api } from "./axios"
import { ApiError, type ApiResponse } from "./api-response"

export async function apiRequest<T>(config: Parameters<typeof api.request>[0]): Promise<T> {
  try {
    const response = await api.request<ApiResponse<T>>(config)

    if (response.data.status === 0) {
      throw new ApiError(response.data.message)
    }

    return response.data.data
  } catch (error) {
    if (error instanceof ApiError) throw error

    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message ?? "Network error. Please try again."
      throw new ApiError(message)
    }

    throw new ApiError("Something went wrong. Please try again.")
  }
}

export async function apiRequestRaw<T>(config: Parameters<typeof api.request>[0]): Promise<T> {
  try {
    const response = await api.request<{ status: 0 | 1; message?: string } & T>(config)

    if (response.data.status === 0) {
      throw new ApiError(response.data.message ?? "Something went wrong.")
    }

    return response.data
  } catch (error) {
    if (error instanceof ApiError) throw error
    if (axios.isAxiosError(error)) {
      throw new ApiError(error.response?.data?.message ?? "Network error. Please try again.")
    }
    throw new ApiError("Something went wrong. Please try again.")
  }
}