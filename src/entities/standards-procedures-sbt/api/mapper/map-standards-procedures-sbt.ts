import { StandardsProceduresSbtDto } from '../dto/standards-procedures-sbt.dto.ts'
import { StandardsProceduresSbt } from 'entities/standards-procedures-sbt'

export const mapStandardsProceduresSbt = (dto: StandardsProceduresSbtDto): StandardsProceduresSbt => ({
    standards_description: dto.standards,
    inspection_category: dto.inspection_category,
    id: dto.id,
    name: dto.name
})
