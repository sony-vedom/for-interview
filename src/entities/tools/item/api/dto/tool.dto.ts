export interface ToolDTO {
    id: number
    factory_number: string
    start_date: string
    finish_date: string
    notes: string | null
    is_expired: boolean
    in_active_report: boolean
    kind_id: number
    type_id: number
    sbt_report_id: number
}
