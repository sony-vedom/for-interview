import { TypesSimpleEducationDTO } from '../dto/types-simple-education.dto.ts'
import { TypesSimpleEducation } from '../../model/types'

export const mapTypesSimpleEducation = (dto: TypesSimpleEducationDTO): TypesSimpleEducation => ({
    name: dto.name,
    id: dto.id
})
