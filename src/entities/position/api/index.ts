import { apiInstance } from 'shared/api'
import { Position, PositionCreate, PositionEdit } from 'entities/position/model/types'
import { PositionDTO } from 'entities/position/api/dto'
import { mapPosition } from 'entities/position/api/mapper/map-position.ts'
import { GetPositionQuery } from 'entities/position/api/query/get-position.query.ts'
import { mapEditPosition } from 'entities/position/api/mapper/map-edit-position.ts'

const BASE_URL = '/position/'

export const getPositions = async (): Promise<Position[]> => {
    const res = await apiInstance.get<PositionDTO[]>(`${BASE_URL}`)
    return res.data.map(mapPosition)
}

export const createPosition = async (body: PositionCreate): Promise<Position> => {
    const res = await apiInstance.post<Position>(`${BASE_URL}`, body)
    return {
        ...mapPosition(res.data)
    }
}

export const getPosition = async (params: GetPositionQuery): Promise<Position> => {
    const res = await apiInstance.get<PositionDTO>(`${BASE_URL}${params.position_id}`)
    return {
        ...mapPosition(res.data)
    }
}

export const editPosition = async (params: GetPositionQuery & PositionEdit): Promise<Position> => {
    const { position_id, ...rest } = params
    const res = await apiInstance.patch<Position>(`${BASE_URL}${position_id}`, mapEditPosition(rest))
    return {
        ...mapPosition(res.data)
    }
}

export const deletePosition = async (params: GetPositionQuery): Promise<any> => {
    return await apiInstance.delete(`${BASE_URL}${params.position_id}`)
}