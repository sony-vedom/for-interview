import { PositionDTO } from '../dto'
import { Position } from 'entities/position/model/types'

export const mapPosition = (dto: PositionDTO): Position => ({
    id: dto.id,
    name: dto.name
})
