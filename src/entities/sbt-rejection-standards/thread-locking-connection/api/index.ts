import { apiInstance } from 'shared/api'
import {
    ThreadLockingConnection,
    ThreadLockingConnectionCreate,
    ThreadLockingConnectionEdit
} from '../model/types'
import { ThreadLockingConnectionDto } from './dto/thread-locking-connection.dto.ts'
import { mapThreadLockingConnection } from './mapper/map-thread-locking-connection.ts'
import {
    GetThreadLockingConnectionQuery, GetThreadLockingConnectionQueryFilters
} from './query/get-thread-locking-connection.query.ts'
import {
    mapThreadLockingConnectionEdit
} from './mapper/map-thread-locking-connection-edit.ts'
import { preparedQueryParamsForRequest } from 'shared/lib/helpers'
import {
    mapThreadLockingConnectionCreate
} from './mapper/map-thread-locking-connection-create.ts'


const BASE_URL = '/thread_locking_connection/'

export const getThreadLockingConnectionList = async (filters?: GetThreadLockingConnectionQueryFilters): Promise<ThreadLockingConnection[]> => {
    const res = await apiInstance.get<ThreadLockingConnectionDto[]>(`${BASE_URL}`, {
        params: preparedQueryParamsForRequest(undefined, filters)
    })
    return res.data.map(mapThreadLockingConnection)
}

export const createThreadLockingConnection = async (body: ThreadLockingConnectionCreate): Promise<ThreadLockingConnection> => {
    const res = await apiInstance.post<ThreadLockingConnectionDto>(`${BASE_URL}`, mapThreadLockingConnectionCreate(body))
    return {
        ...mapThreadLockingConnection(res.data)
    }
}

export const getThreadLockingConnection = async (params: GetThreadLockingConnectionQuery): Promise<ThreadLockingConnection> => {
    const res = await apiInstance.get<ThreadLockingConnectionDto>(`${BASE_URL}${params.thread_locking_connection_id}`)
    return {
        ...mapThreadLockingConnection(res.data)
    }
}

export const editThreadLockingConnection = async (params: GetThreadLockingConnectionQuery & ThreadLockingConnectionEdit): Promise<ThreadLockingConnection> => {
    const { thread_locking_connection_id, ...rest } = params
    const res = await apiInstance.patch<ThreadLockingConnectionDto>(`${BASE_URL}${thread_locking_connection_id}`,
        mapThreadLockingConnectionEdit(rest))
    return {
        ...mapThreadLockingConnection(res.data)
    }
}

export const deleteThreadLockingConnection = async (params: GetThreadLockingConnectionQuery): Promise<any> => {
    return await apiInstance.delete(`${BASE_URL}${params.thread_locking_connection_id}`)
}
