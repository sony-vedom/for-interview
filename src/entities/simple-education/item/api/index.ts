import { apiInstance, Pagination, PaginationQuery } from 'shared/api'
import {
    SimpleEducation,
    SimpleEducationCreate,
    SimpleEducationEdit
} from '../model/types'
import { SimpleEducationDTO } from '../api/dto/simple-education.dto.ts'
import { mapSimpleEducation } from '../api/mapper/map-simple-education.ts'
import {
    GetSimpleEducationQuery, GetSimpleEducationFilters
} from '../api/query/get-types-simple-education.query.ts'
import {
    mapSimpleEducationEdit
} from './mapper/map-simple-education-edit.ts'
import { preparedQueryParamsForRequest } from 'shared/lib/helpers'
import { mapSimpleEducationCreate } from 'entities/simple-education/item/api/mapper/map-simple-education-create.ts'

const BASE_URL = '/simple_education/'

export const getSimpleEducations = async (params?: PaginationQuery, filters?: GetSimpleEducationFilters): Promise<Pagination<SimpleEducation[]>> => {
    const res = await apiInstance.get<Pagination<SimpleEducationDTO[]>>(`${BASE_URL}`, {
        params: preparedQueryParamsForRequest(params, filters)
    })
    return {
        ...res.data,
        items: res.data.items.map(mapSimpleEducation)
    }
}

export const createSimpleEducation = async (body: SimpleEducationCreate): Promise<SimpleEducation> => {
    const res = await apiInstance.post<SimpleEducation>(`${BASE_URL}`, mapSimpleEducationCreate(body))
    return {
        ...mapSimpleEducation(res.data)
    }
}

export const getSimpleEducation = async (params: GetSimpleEducationQuery): Promise<SimpleEducation> => {
    const res = await apiInstance.get<SimpleEducationDTO>(`${BASE_URL}${params.simple_education_id}`)
    return {
        ...mapSimpleEducation(res.data)
    }
}

export const editSimpleEducation = async (params: GetSimpleEducationQuery & SimpleEducationEdit): Promise<SimpleEducation> => {
    const { simple_education_id, ...rest } = params
    const res = await apiInstance.patch<SimpleEducation>(`${BASE_URL}${simple_education_id}`, mapSimpleEducationEdit(rest))
    return {
        ...mapSimpleEducation(res.data)
    }
}

export const deleteSimpleEducation = async (params: GetSimpleEducationQuery): Promise<any> => {
    return await apiInstance.delete(`${BASE_URL}${params.simple_education_id}`)
}