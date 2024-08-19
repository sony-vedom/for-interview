import { apiInstance, Pagination, PaginationQuery } from 'shared/api'
import { ICurrentSbtParams } from 'entities/current-pipe-parameters/item/model/sbt-current-param.ts'
import { ICurrentSbtParamsDTO } from 'entities/current-pipe-parameters/item/api/dto/sbt.dto.ts'
import { mapSbtCurrentParameter } from 'entities/current-pipe-parameters/item/api/mapper/map-sbt'
import { ICreateCurrentSbtParams } from 'entities/current-pipe-parameters/item/model/create-sbt-current-param.ts'
import { mapCreateSbtCurrentParameter } from 'entities/current-pipe-parameters/item/api/mapper/create-map-sbt'
import {
    CurrentParamByIdQuery,
    CurrentParamBySerialNumberQuery,
    GetContractQueryFilters
} from 'entities/current-pipe-parameters/item/api/query/current-parameter.query.ts'
import { IEditCurrentSbtParams } from 'entities/current-pipe-parameters/item/model/edit-sbt-current-param.ts'
import { mapEditSbtCurrentParameter } from 'entities/current-pipe-parameters/item/api/mapper/edit-map-sbt'
import { preparedQueryParamsForRequest } from 'shared/lib/helpers'


const BASE_URL = '/current_pipe_parameters_sbt/'

export const getCurrentParamList = async (params?: PaginationQuery, filters?: GetContractQueryFilters): Promise<Pagination<ICurrentSbtParams[]>> => {
    const res = await apiInstance.get<Pagination<ICurrentSbtParamsDTO[]>>(BASE_URL, {
        params: preparedQueryParamsForRequest(params, filters)
    })

    return {
        ...res.data,
        items: res.data.items.map(mapSbtCurrentParameter)
    }
}

export const createCurrentParam = async (body: ICreateCurrentSbtParams): Promise<ICurrentSbtParams> => {
    const res = await apiInstance.post<ICurrentSbtParamsDTO>(`${BASE_URL}`, mapCreateSbtCurrentParameter(body))
    return mapSbtCurrentParameter(res.data)
}

export const getCurrentParam = async (params: CurrentParamByIdQuery): Promise<ICurrentSbtParams> => {
    const res = await apiInstance.get<ICurrentSbtParamsDTO>(`${BASE_URL}${params.current_params_id}/`)
    return mapSbtCurrentParameter(res.data)
}

export const getCurrentParamBySerialNumber = async (params: CurrentParamBySerialNumberQuery): Promise<ICurrentSbtParams> => {
    const res = await apiInstance.get<ICurrentSbtParamsDTO>(`${BASE_URL}serial_number/${params.serial_number}/`)
    return mapSbtCurrentParameter(res.data)
}

export const editCurrentParam = async (params: CurrentParamByIdQuery & IEditCurrentSbtParams): Promise<ICurrentSbtParams> => {
    const { current_params_id, ...rest } = params
    const res = await apiInstance.patch<ICurrentSbtParamsDTO>(`${BASE_URL}${current_params_id}/`,
        mapEditSbtCurrentParameter(rest))
    return mapSbtCurrentParameter(res.data)
}


export const deleteCurrentParam = async (params: CurrentParamByIdQuery): Promise<any> => {
    return await apiInstance.delete(`${BASE_URL}${params.current_params_id}/`)
}
