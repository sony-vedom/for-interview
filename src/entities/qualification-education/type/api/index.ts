import { apiInstance, Pagination, PaginationQuery } from 'shared/api'
import {
    TypeQualificationEducation,
    TypeQualificationEducationCreate,
    TypeQualificationEducationEdit
} from '../model/types'
import { TypeQualificationEducationDTO } from './dto/type-qualification-education.dto.ts'
import { mapTypeQualificationEducation } from './mapper/map-type-qualification-education.ts'
import {
    GetTypeQualificationEducationFilters,
    GetTypeQualificationEducationQuery
} from './query/get-type-qualification-education.query.ts'
import {
    maTypeQualificationEducationEdit
} from './mapper/map-type-qualification-education-edit.ts'
import {
    mapTypeQualificationEducationCreate
} from './mapper/map-type-qualification-education-create.ts'
import { preparedQueryParamsForRequest } from 'shared/lib/helpers'


const BASE_URL = '/type_qualification_education/'

export const getTypeQualificationEducations = async (params?: PaginationQuery, filters?: GetTypeQualificationEducationFilters): Promise<Pagination<TypeQualificationEducation[]>> => {
    const res = await apiInstance.get<Pagination<TypeQualificationEducationDTO[]>>(`${BASE_URL}`, {
        params: preparedQueryParamsForRequest(params, filters)
    })
    return {
        ...res.data,
        items: res.data.items.map(mapTypeQualificationEducation)
    }
}

export const createTypeQualificationEducation = async (body: TypeQualificationEducationCreate): Promise<TypeQualificationEducation> => {
    const res = await apiInstance.post<TypeQualificationEducation>(`${BASE_URL}`,
        mapTypeQualificationEducationCreate(body))
    return {
        ...mapTypeQualificationEducation(res.data)
    }
}

export const getTypeQualificationEducation = async (params: GetTypeQualificationEducationQuery): Promise<TypeQualificationEducation> => {
    const res = await apiInstance.get<TypeQualificationEducationDTO>(`${BASE_URL}${params.type_qualification_education_id}`)
    return {
        ...mapTypeQualificationEducation(res.data)
    }
}

export const editTypeQualificationEducation = async (params: GetTypeQualificationEducationQuery & TypeQualificationEducationEdit): Promise<TypeQualificationEducation> => {
    const { type_qualification_education_id, ...rest } = params
    const res = await apiInstance.patch<TypeQualificationEducationDTO>(`${BASE_URL}${type_qualification_education_id}`,
        maTypeQualificationEducationEdit(rest))
    return {
        ...mapTypeQualificationEducation(res.data)
    }
}

export const deleteTypeQualificationEducation = async (params: GetTypeQualificationEducationQuery): Promise<any> => {
    return await apiInstance.delete(`${BASE_URL}${params.type_qualification_education_id}`)
}
