import { apiInstance } from 'shared/api'
import {
    NameTypeQualificationEducation,
    NameTypeQualificationEducationCreate,
    NameTypeQualificationEducationEdit
} from '../model/types'
import { NameTypeQualificationEducationDTO } from './dto/name-type-qualification-education.dto.ts'
import { mapNameTypeQualificationEducation } from './mapper/map-name-type-qualification-education.ts'
import {
    GetNameTypeQualificationEducationFilters,
    GetNameTypeQualificationEducationQuery
} from './query/get-name-type-qualification-education.query.ts'
import {
    maTypeQualificationEducationEdit
} from './mapper/map-name-type-qualification-education-edit.ts'
import {
    mapNameTypeQualificationEducationCreate
} from './mapper/map-name-type-qualification-education-create.ts'
import { preparedQueryParamsForRequest } from 'shared/lib/helpers'


const BASE_URL = '/name_type_qualification_education/'

export const getNameTypeQualificationEducations = async (filters?: GetNameTypeQualificationEducationFilters): Promise<NameTypeQualificationEducation[]> => {
    const res = await apiInstance.get<NameTypeQualificationEducationDTO[]>(`${BASE_URL}`, {
        params: preparedQueryParamsForRequest(undefined, filters)
    })
    return res.data.map(mapNameTypeQualificationEducation)
}

export const createTypeQualificationEducation = async (body: NameTypeQualificationEducationCreate): Promise<NameTypeQualificationEducation> => {
    const res = await apiInstance.post<NameTypeQualificationEducationDTO>(`${BASE_URL}`,
        mapNameTypeQualificationEducationCreate(body))
    return {
        ...mapNameTypeQualificationEducation(res.data)
    }
}

export const getNameTypeQualificationEducation = async (params: GetNameTypeQualificationEducationQuery): Promise<NameTypeQualificationEducation> => {
    const res = await apiInstance.get<NameTypeQualificationEducationDTO>(`${BASE_URL}${params.name_type_qualification_education_id}`)
    return {
        ...mapNameTypeQualificationEducation(res.data)
    }
}

export const editNameTypeQualificationEducation = async (params: GetNameTypeQualificationEducationQuery & NameTypeQualificationEducationEdit): Promise<NameTypeQualificationEducation> => {
    const { name_type_qualification_education_id, ...rest } = params
    const res = await apiInstance.patch<NameTypeQualificationEducationDTO>(`${BASE_URL}${name_type_qualification_education_id}`,
        maTypeQualificationEducationEdit(rest))
    return {
        ...mapNameTypeQualificationEducation(res.data)
    }
}

export const deleteNameTypeQualificationEducation = async (params: GetNameTypeQualificationEducationQuery): Promise<any> => {
    return await apiInstance.delete(`${BASE_URL}${params.name_type_qualification_education_id}`)
}
