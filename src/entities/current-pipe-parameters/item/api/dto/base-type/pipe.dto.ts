import { STATUS_CLASS, STATUS_PIPE } from '../../../model/parameters-statuces'

export interface IMainInfoDTO {
    id: number
    serial_number: string
    comment: string
    report_id: number
    status: `${STATUS_PIPE}`
    final_class: `${STATUS_CLASS}`
    pre_repair_condition: boolean,
    standards_procedures: number,
    rejection_standard_id: number,
    minimum_wall_thickness_ultra: number
    minimum_wall_thickness_premium: number
    minimum_wall_thickness_class_2: number
}
