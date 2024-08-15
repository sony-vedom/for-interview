import { PositionDTO } from 'entities/position/api/dto/position.dto.ts'

export type CreatePositionDTO = Omit<PositionDTO, "id">
