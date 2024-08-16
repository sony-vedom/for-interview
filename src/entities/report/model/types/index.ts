import { StandardsProceduresSbt } from 'entities/standards-procedures/@x'

export interface Report {
    date_start_detection: string
    date_finish_detection: string | null
    customer: string
    location: string
    contract_number: string
    number_order: string
    report_number: string
    standards_procedures: StandardsProceduresSbt
    created_at: string
    user_id: number
    parameter_id: number
    rejection_standard_id: number
    minimum_wall_thickness_ultra: string
    minimum_wall_thickness_premium: string
    minimum_wall_thickness_class_2: string
    id: number
}

export interface ReportCreate {
    date_start_detection: Date
    date_finish_detection?: Date | null
    customer: string
    location: string
    contract_number: string
    number_order: string
    report_number: string
    standards_procedures_id: number
    user_id: number
    parameter_id: number
}

export type ReportEdit = Partial<ReportCreate> & {}
