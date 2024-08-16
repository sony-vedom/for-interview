import { apiInstance } from 'shared/api'
import {
    StandardsProceduresSbt,
    StandardsProceduresSbtCreate,
    StandardsProceduresSbtEdit
} from '../model/types'
import { StandardsProceduresSbtDto } from './dto/standards-procedures-sbt.dto.ts'
import { mapStandardsProceduresSbt } from './mapper/map-standards-procedures-sbt.ts'
import {
    GetStandardsProceduresSbtQuery, GetStandardsProceduresSbtFilters
} from './query/get-standards-procedures-sbt.query.ts'
import {
    mapStandardsProceduresSbtEdit
} from './mapper/map-standards-procedures-sbt-edit.ts'
import { preparedQueryParamsForRequest } from 'shared/lib/helpers'
import {
    mapStandardsProceduresSbtCreate
} from './mapper/map-standards-procedures-sbt-create.ts'


const BASE_URL = '/standards_procedures_sbt/'

export const getStandardsProcedureSbtList = async (filters?: GetStandardsProceduresSbtFilters): Promise<StandardsProceduresSbt[]> => {
    const res = await apiInstance.get<StandardsProceduresSbtDto[]>(`${BASE_URL}`, {
        params: preparedQueryParamsForRequest(undefined, filters)
    })
    return res.data.map(mapStandardsProceduresSbt)
}

export const createStandardsProcedureSbt = async (body: StandardsProceduresSbtCreate): Promise<StandardsProceduresSbt> => {
    const res = await apiInstance.post<StandardsProceduresSbtDto>(`${BASE_URL}`, mapStandardsProceduresSbtCreate(body))
    return {
        ...mapStandardsProceduresSbt(res.data)
    }
}

export const getStandardsProcedureSbt = async (params: GetStandardsProceduresSbtQuery): Promise<StandardsProceduresSbt> => {
    const res = await apiInstance.get<StandardsProceduresSbtDto>(`${BASE_URL}${params.standard_procedures_sbt_query}`)
    return {
        ...mapStandardsProceduresSbt(res.data)
    }
}

export const editStandardsProcedureSbt = async (params: GetStandardsProceduresSbtQuery & StandardsProceduresSbtEdit): Promise<StandardsProceduresSbt> => {
    const { standard_procedures_sbt_query, ...rest } = params
    const res = await apiInstance.patch<StandardsProceduresSbtDto>(`${BASE_URL}${standard_procedures_sbt_query}`,
        mapStandardsProceduresSbtEdit(rest))
    return {
        ...mapStandardsProceduresSbt(res.data)
    }
}

export const deleteStandardsProcedureSbt = async (params: GetStandardsProceduresSbtQuery): Promise<any> => {
    return await apiInstance.delete(`${BASE_URL}${params.standard_procedures_sbt_query}`)
}
