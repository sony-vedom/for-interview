import { StandardsProceduresSbtCreate } from '../../model/types'
import { StandardsProceduresSbtCreateDto } from '../dto/standards-procedures-sbt-create.dto.ts'

export const mapStandardsProceduresSbtCreate = (model: StandardsProceduresSbtCreate): StandardsProceduresSbtCreateDto => ({
    standards: model.standards_description,
    inspection_category: model.inspection_category
})
