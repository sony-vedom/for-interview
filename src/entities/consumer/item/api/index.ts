import { apiInstance, Pagination, PaginationQuery } from 'shared/api'
import {
    Consumer,
    ConsumerCreate,
    ConsumerEdit
} from '../model/types'
import { ConsumerDTO } from './dto/consumer.dto.ts'
import { mapConsumer } from './mapper/map-consumer.ts'
import {
    GetConsumerQuery, GetConsumerQueryFilters
} from './query/get-consumer.query.ts'
import {
    mapConsumerEdit
} from './mapper/map-consumer-edit.ts'
import { preparedQueryParamsForRequest } from 'shared/lib/helpers'
import { mapConsumerCreate } from 'entities/consumer/item/api/mapper/map-consumer-create.ts'

const BASE_URL = '/consumer/'

export const getConsumers = async (params?: PaginationQuery, filters?: GetConsumerQueryFilters): Promise<Pagination<Consumer[]>> => {
    const res = await apiInstance.get<Pagination<ConsumerDTO[]>>(`${BASE_URL}`, {
        params: preparedQueryParamsForRequest(params, filters)
    })
    return {
        ...res.data,
        items: res.data.items.map(mapConsumer)
    }
}

export const createConsumer = async (body: ConsumerCreate): Promise<ConsumerDTO> => {
    const res = await apiInstance.post<ConsumerDTO>(`${BASE_URL}`, mapConsumerCreate(body))
    return {
        ...mapConsumer(res.data)
    }
}

export const getConsumer = async (params: GetConsumerQuery): Promise<Consumer> => {
    const res = await apiInstance.get<ConsumerDTO>(`${BASE_URL}${params.consumer_id}`)
    return {
        ...mapConsumer(res.data)
    }
}

export const editConsumer = async (params: GetConsumerQuery & ConsumerEdit): Promise<Consumer> => {
    const { consumer_id, ...rest } = params
    const res = await apiInstance.patch<ConsumerDTO>(`${BASE_URL}${consumer_id}`,
        mapConsumerEdit(rest))
    return {
        ...mapConsumer(res.data)
    }
}

export const deleteConsumer = async (params: GetConsumerQuery): Promise<any> => {
    return await apiInstance.delete(`${BASE_URL}${params.consumer_id}`)
}
