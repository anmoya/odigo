export interface PagedResult<T> {
    elements: T[],
    totalElements: number,
    totalPages: number
}

export interface ApiResponse<T> {
    data?: T,
    success: boolean
    message?: string
    error?: string
}