export type BackendResponse<T> = {
    code: number;
    message?: string;
    success?: boolean;
    data: T;
    pagination?: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
        hasNextPage: boolean;
    };
}
export type Pagination = {
    meta: {
        page: number;
        limit: number;
        total: number;
    }
}

export type BackendErrorResponse = {
    error: number;
    message: string;
    statusCode: number;
}
