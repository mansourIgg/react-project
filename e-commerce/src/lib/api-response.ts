// src/lib/api-response.ts
export interface ApiSuccessResponse<T> {
  status: 1
  data: T
}

export interface ApiErrorResponse {
  status: 0
  message: string
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

export class ApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ApiError"
  }
}