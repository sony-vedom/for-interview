import { apiInstance, Pagination, PaginationQuery } from 'shared/api'
import {
    GetSbtRejectionStandardsQuery, GetSbtRejectionStandardsQueryFilters
} from './query/get-sbt-rejection-standards.query.ts'
import { preparedQueryParamsForRequest } from 'shared/lib/helpers'
import { SbtRejectionStandards, SbtRejectionStandardsCreate, SbtRejectionStandardsEdit } from '../model'
import { SbtRejectionStandardsDTO } from '../api/dto'
import {
    mapSbtRejectionStandards
} from '../api/mapper/map-sbt-rejection-standards.ts'
import {
    mapCreateSbtRejectionStandards
} from 'entities/sbt-rejection-standards/item/api/mapper/map-create-rejection-standards.ts'
import {
    mapEditSbtRejectionStandards
} from 'entities/sbt-rejection-standards/item/api/mapper/map-edit-rejection-standards.ts'

const BASE_URL = '/sbt_rejection_standards/'

export const getSbtRejectionStandardsList = async (pagination?: PaginationQuery, filters?: GetSbtRejectionStandardsQueryFilters): Promise<Pagination<SbtRejectionStandards[]>> => {
    const res = await apiInstance.get<Pagination<SbtRejectionStandardsDTO[]>>(`${BASE_URL}`, {
        params: preparedQueryParamsForRequest(pagination, filters)
    })
    return {
        ...res.data,
        items: res.data.items.map(mapSbtRejectionStandards)
    }
}

export const createSbtRejectionStandards = async (body: SbtRejectionStandardsCreate): Promise<SbtRejectionStandards> => {
    const res = await apiInstance.post<SbtRejectionStandardsDTO>(`${BASE_URL}`, mapCreateSbtRejectionStandards(body))
    return {
        ...mapSbtRejectionStandards(res.data)
    }
}

export const getSbtRejectionStandards = async (params: GetSbtRejectionStandardsQuery): Promise<SbtRejectionStandards> => {
    const res = await apiInstance.get<SbtRejectionStandardsDTO>(`${BASE_URL}${params.sbt_rejection_standards_id}`)
    return {
        ...mapSbtRejectionStandards(res.data)
    }
}

export const editSbtRejectionStandards = async (params: GetSbtRejectionStandardsQuery & SbtRejectionStandardsEdit): Promise<SbtRejectionStandards> => {
    const { sbt_rejection_standards_id, ...rest } = params
    const res = await apiInstance.patch<SbtRejectionStandardsDTO>(`${BASE_URL}${sbt_rejection_standards_id}`, mapEditSbtRejectionStandards(rest))
    return {
        ...mapSbtRejectionStandards(res.data)
    }
}

export const deleteSbtRejectionStandards = async (params: GetSbtRejectionStandardsQuery): Promise<any> => {
    return await apiInstance.delete(`${BASE_URL}${params.sbt_rejection_standards_id}`)
}