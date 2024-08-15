import { apiInstance } from 'shared/api'
import {
    TypesSimpleEducation,
    TypesSimpleEducationCreate,
    TypesSimpleEducationEdit
} from '../model/types'
import { TypesSimpleEducationDTO } from '../api/dto/types-simple-education.dto.ts'
import { mapTypesSimpleEducation } from '../api/mapper/map-types-simple-education.ts'
import {
    GetTypesSimpleEducationQuery
} from '../api/query/get-types-simple-education.query.ts'
import {
    mapTypesSimpleEducationEdit
} from 'entities/simple-education/type/api/mapper/map-types-simple-education-edit.ts'

const BASE_URL = '/type_simple_education/'

export const getTypesSimpleEducations = async (): Promise<TypesSimpleEducation[]> => {
    const res = await apiInstance.get<TypesSimpleEducationDTO[]>(`${BASE_URL}`)
    return res.data.map(mapTypesSimpleEducation)
}

export const createTypesSimpleEducation = async (body: TypesSimpleEducationCreate): Promise<TypesSimpleEducation> => {
    const res = await apiInstance.post<TypesSimpleEducation>(`${BASE_URL}`, body)
    return {
        ...mapTypesSimpleEducation(res.data)
    }
}

export const getTypesSimpleEducation = async (params: GetTypesSimpleEducationQuery): Promise<TypesSimpleEducation> => {
    const res = await apiInstance.get<TypesSimpleEducationDTO>(`${BASE_URL}${params.types_simple_education_id}`)
    return {
        ...mapTypesSimpleEducation(res.data)
    }
}

export const editTypesSimpleEducation = async (params: GetTypesSimpleEducationQuery & TypesSimpleEducationEdit): Promise<TypesSimpleEducation> => {
    const { types_simple_education_id, ...rest } = params
    const res = await apiInstance.patch<TypesSimpleEducation>(`${BASE_URL}${types_simple_education_id}`, mapTypesSimpleEducationEdit(rest))
    return {
        ...mapTypesSimpleEducation(res.data)
    }
}

export const deleteTypesSimpleEducation = async (params: GetTypesSimpleEducationQuery): Promise<any> => {
    return await apiInstance.delete(`${BASE_URL}${params.types_simple_education_id}`)
}