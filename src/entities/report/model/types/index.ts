import { StandardsProceduresSbt } from 'entities/standards-procedures/@x'

enum ConditionPipeInReport {
    NEW = "Новый",
    OLD = "Бывший в употреблении"
}

export interface Report {
    date_start_detection: Date
    date_finish_detection: Date | null
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
    kit_number: null | string
    application: null | string
    condition: `${ConditionPipeInReport}`
    is_finished: boolean
}

export interface ReportCreate {
    date_start_detection: Date
    date_finish_detection?: Date | null
    customer: string
    location: string
    contract_number: string
    number_order: string
    standards_procedures_id: number
    user_id: number
    parameter_id: number
    kit_number: string
    application: string
    condition: `${ConditionPipeInReport}`
}

export type ReportEdit = Partial<ReportCreate> & {}

export type ReportFinish = {
    date_finish_detection: Date
}