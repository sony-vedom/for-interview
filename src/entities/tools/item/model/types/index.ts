export interface Tool {
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

export type ToolsCreate = Omit<Tool, 'id' | 'is_expired' | 'in_active_report'>

export type ToolsEdit = Omit<Tool, 'id' | 'is_expired'>
