import { StandardsProceduresSbtEdit } from '../../model/types'
import {
    StandardsProceduresSbtEditDto
} from 'entities/standards-procedures/api/dto/standards-procedures-sbt-edit.dto.ts'

export const mapStandardsProceduresSbtEdit = (model: StandardsProceduresSbtEdit): StandardsProceduresSbtEditDto => ({
    standards: model.standards_description,
    inspection_category: model.inspection_category
})
