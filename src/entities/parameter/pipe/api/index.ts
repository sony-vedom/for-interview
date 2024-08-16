import { apiInstance, Pagination, PaginationQuery } from 'shared/api'
import {
    PipeParameter
} from '../model/types'
import { PipeParameterDto } from './dto/pipe-parameter.dto.ts'
import { mapPipeParameter } from './mapper/map-pipe-parameter.ts'
import {
    GetParameterPipeQuery, ParameterPipeQueryFilters
} from './query/get-parameter-pipe.query.ts'
import { preparedQueryParamsForRequest } from 'shared/lib/helpers'

const BASE_URL = '/pipe_parameter/'

export const getPipeParameterList = async (pagination?: PaginationQuery, filters?: ParameterPipeQueryFilters): Promise<Pagination<PipeParameter[]>> => {
    const res = await apiInstance.get<Pagination<PipeParameterDto[]>>(`${BASE_URL}`, {
        params: preparedQueryParamsForRequest(pagination, filters)
    })
    return {
        ...res.data,
        items: res.data.items.map(mapPipeParameter)
    }
}

export const getPipeParameter = async (params: GetParameterPipeQuery): Promise<PipeParameter> => {
    const res = await apiInstance.get<PipeParameterDto>(`${BASE_URL}${params.parameter_id}`)
    return mapPipeParameter(res.data)
}

export const deletePipeParameterTools = async (params: GetParameterPipeQuery): Promise<any> => {
    return await apiInstance.delete(`${BASE_URL}${params.parameter_id}`)
}
