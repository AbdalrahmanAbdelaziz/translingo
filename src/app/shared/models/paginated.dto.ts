export interface PaginatedResultDTO<T> {
    data: T[];
    currentPage: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
    succeeded: boolean;
    message: string;
    errors?: string[];
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}
