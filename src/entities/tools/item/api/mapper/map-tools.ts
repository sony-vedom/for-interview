import { ToolDTO } from '../dto/tool.dto.ts'
import { Tool } from '../../model/types'

export const mapTools = (dto: ToolDTO): Tool => ({
    id: dto.id,
    factory_number: dto.factory_number,
    start_date: dto.start_date,
    finish_date: dto.finish_date,
    notes: dto.notes,
    is_expired: dto.is_expired,
    in_active_report: dto.in_active_report,
    kind_id: dto.kind_id,
    type_id: dto.type_id,
    sbt_report_id: dto.sbt_report_id
})
