import { apiInstance } from 'shared/api'
import {
    QualificationEducation,
    QualificationEducationCreate,
    QualificationEducationEdit
} from '../model/types'
import { QualificationEducationDTO } from './dto/qualification-education.dto.ts'
import { mapQualificationEducation } from './mapper/map-qualification-education.ts'
import {
    GetQualificationEducationFilters,
    GetSimpleEducationQuery
} from './query/get-qualification-education.query.ts'
import {
    mapSimpleEducationEdit
} from './mapper/map-qualification-education-edit.ts'
import {
    mapQualificationEducationCreate
} from 'entities/qualification-education/item/api/mapper/map-qualification-education-create.ts'
import { preparedQueryParamsForRequest } from 'shared/lib/helpers'


const BASE_URL = '/qualification_education/'

export const getQualificationEducations = async (filters?: GetQualificationEducationFilters): Promise<QualificationEducation[]> => {
    const res = await apiInstance.get<QualificationEducationDTO[]>(`${BASE_URL}`, {
        params: preparedQueryParamsForRequest(undefined, filters)
    })
    return res.data.map(mapQualificationEducation)
}

export const createQualificationEducation = async (body: QualificationEducationCreate): Promise<QualificationEducation> => {
    const res = await apiInstance.post<QualificationEducationDTO>(`${BASE_URL}`, mapQualificationEducationCreate(body))
    return {
        ...mapQualificationEducation(res.data)
    }
}

export const getQualificationEducation = async (params: GetSimpleEducationQuery): Promise<QualificationEducation> => {
    const res = await apiInstance.get<QualificationEducationDTO>(`${BASE_URL}${params.qualification_education_id}`)
    return {
        ...mapQualificationEducation(res.data)
    }
}

export const editQualificationEducation = async (params: GetSimpleEducationQuery & QualificationEducationEdit): Promise<QualificationEducation> => {
    const { qualification_education_id, ...rest } = params
    const res = await apiInstance.patch<QualificationEducationDTO>(`${BASE_URL}${qualification_education_id}`,
        mapSimpleEducationEdit(rest))
    return {
        ...mapQualificationEducation(res.data)
    }
}

export const deleteQualificationEducation = async (params: GetSimpleEducationQuery): Promise<any> => {
    return await apiInstance.delete(`${BASE_URL}${params.qualification_education_id}`)
}
