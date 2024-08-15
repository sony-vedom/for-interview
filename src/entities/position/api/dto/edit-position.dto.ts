import { PositionDTO } from 'entities/position/api/dto/position.dto.ts'

export type EditPositionDTO = Partial<Omit<PositionDTO, "id">>
