import { ToolsEdit } from '../../model/types'
import { ToolsEditDTO } from 'entities/tools/item/api/dto/tools-edit.dto.ts'

export const mapToolsEdit = (model: ToolsEdit): ToolsEditDTO => ({
    factory_number: model.factory_number,
    start_date: model.start_date,
    finish_date: model.finish_date,
    notes: model.notes,
    kind_id: model.kind_id,
    type_id: model.type_id,
    sbt_report_id: model.sbt_report_id,
    in_active_report: model.in_active_report
})
