import { PositionEdit } from 'entities/position/model/types'
import { EditPositionDTO } from 'entities/position/api/dto/edit-position.dto.ts'


export const mapEditPosition = (model: PositionEdit): EditPositionDTO => ({
    name: model.name
})
