import { apiInstance, Pagination, PaginationQuery } from 'shared/api'
import { GetPositionQuery } from 'entities/position/api/query/get-position.query.ts'
import {
    MedicalExamination,
    MedicalExaminationCreate,
    MedicalExaminationEdit
} from 'entities/medical-examination/model'
import { MedicalExaminationDTO } from 'entities/medical-examination/api/dto'
import { mapMedicalExamination } from 'entities/medical-examination/api/mapper/map-medical-examination.ts'
import {
    GetMedicalExaminationQuery,
    GetMedicalExaminationQueryFilters
} from './query/get-medical-examination.query.ts'
import { mapEditMedicalExamination } from './mapper/map-edit-medical-examination.ts'
import { preparedQueryParamsForRequest } from 'shared/lib/helpers'

const BASE_URL = '/annual_medical_examination/'

export const getMedicalExaminations = async (params?: PaginationQuery, filters?: GetMedicalExaminationQueryFilters): Promise<Pagination<MedicalExamination[]>> => {
    const res = await apiInstance.get<Pagination<MedicalExaminationDTO[]>>(`${BASE_URL}`, {
        params: preparedQueryParamsForRequest(params, filters)
    })
    return {
        ...res.data,
        items: res.data.items.map(mapMedicalExamination)
    }
}

export const createMedicalExamination = async (body: MedicalExaminationCreate): Promise<MedicalExamination> => {
    const res = await apiInstance.post<MedicalExamination>(`${BASE_URL}`, body)
    return {
        ...mapMedicalExamination(res.data)
    }
}

export const getMedicalExamination = async (params: GetMedicalExaminationQuery): Promise<MedicalExamination> => {
    const res = await apiInstance.get<MedicalExaminationDTO>(`${BASE_URL}${params.medical_examination_id}`)
    return {
        ...mapMedicalExamination(res.data)
    }
}

export const editPosition = async (params: GetPositionQuery & MedicalExaminationEdit): Promise<MedicalExamination> => {
    const { position_id, ...rest } = params
    const res = await apiInstance.patch<MedicalExaminationDTO>(`${BASE_URL}${position_id}`, mapEditMedicalExamination(rest))
    return {
        ...mapMedicalExamination(res.data)
    }
}

export const deleteMedicalExamination = async (params: GetMedicalExaminationQuery): Promise<any> => {
    return await apiInstance.delete(`${BASE_URL}${params.medical_examination_id}`)
}