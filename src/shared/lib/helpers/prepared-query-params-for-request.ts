import { mapPagination, PaginationQuery } from 'shared/api'
import { filtersSerialize } from 'shared/config/api/filter.ts'

export const preparedQueryParamsForRequest = (params?: PaginationQuery, filters?: any) => {
    let queryParams: any
    if (filters) {
        queryParams = { ...queryParams, ...filtersSerialize(filters) }
    }
    if (params) {
        queryParams = { ...queryParams, ...mapPagination(params) }
    }
    return queryParams
}