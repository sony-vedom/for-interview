import { ToolsCreate } from '../../model/types'
import { ToolsCreateDTO } from '../dto/tools-create.dto.ts'

export const mapToolsCreate = (model: ToolsCreate): ToolsCreateDTO => ({
    factory_number: model.factory_number,
    start_date: model.start_date,
    finish_date: model.finish_date,
    notes: model.notes,
    kind_id: model.kind_id,
    type_id: model.type_id,
    sbt_report_id: model.sbt_report_id
})
