import {
    STATUS_CLASS,
    STATUS_PIPE
} from "../parameters-statuces"

export interface IMainPipeCurrentParam {
    id: number
    report_id: number
    serial_number: string
    comment: string
    pre_repair_condition: boolean
    status_pipe: `${STATUS_PIPE}`
    final_class_pipe: `${STATUS_CLASS}`,
    standards_procedures: number,
    rejection_standard_id: number
    minimum_wall_thickness_ultra: number
    minimum_wall_thickness_premium: number
    minimum_wall_thickness_class_2: number
}

export interface IBasePipeCurrentParam<PipeBody, Nipple, Coupling>
    extends IMainPipeCurrentParam {
    pipe_body: PipeBody
    nipple: Nipple
    coupling: Coupling
}

export interface ICreateMainPipeCurrentParam
    extends Omit<
        IMainPipeCurrentParam,
        | 'id'
        | 'pre_repair_condition'
        | 'status_pipe'
        | 'final_class_pipe'
        | 'minimum_wall_thickness_ultra'
        | 'minimum_wall_thickness_class_2'
        | 'minimum_wall_thickness_premium'
    > {}

export interface ICreateBasePipeCurrentParam<PipeBody, Nipple, Coupling>
    extends ICreateMainPipeCurrentParam {
    pipe_body: PipeBody
    nipple: Nipple
    coupling: Coupling
}

export interface IEditMainPipeCurrentParam
    extends Omit<
        IMainPipeCurrentParam,
        ""
    > {}

export interface IEditBasePipeCurrentParam<PipeBody, Nipple, Coupling>
    extends IEditMainPipeCurrentParam {
    pipe_body: PipeBody
    nipple: Nipple
    coupling: Coupling
}
