export interface Pagination<T> {
    items: T
    page: number
    pages: number
    size: number
    total: number
}

export interface PaginationQueryDTO {
    size: number,
    page: number
}

export interface PaginationQuery {
    page_size: number,
    page_index: number
}

export const mapPagination = (model: Partial<PaginationQuery>): Partial<PaginationQueryDTO> => ({
    page: model.page_index,
    size: model.page_size
})

export const getInitialList = () => {
    return {
        count: 0,
        next: null,
        previous: null,
        results: []
    }
}