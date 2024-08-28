import { IMainInfoDTO } from '../../dto/base-type/pipe.dto.ts'
import { IMainPipeCurrentParam } from 'entities/current-pipe-parameters/item/model/base-type'

export const mapBasePipe = (dto: IMainInfoDTO) => {
    return {
        id: dto.id,
        report_id: dto.report_id,
        serial_number: dto.serial_number,
        comment: dto.comment,
        pre_repair_condition: dto.pre_repair_condition,
        status_pipe: dto.status,
        final_class_pipe: dto.final_class
    }
}

export const mapEditBasePipe = (model: IMainPipeCurrentParam): IMainInfoDTO => {
    return {
        id: model.id,
        report_id: model.report_id,
        serial_number: model.serial_number,
        comment: model.comment,
        pre_repair_condition: model.pre_repair_condition,
        status: model.status_pipe,
        final_class: model.final_class_pipe,
        standards_procedures: model.standards_procedures,
        rejection_standard_id: model.rejection_standard_id,
        minimum_wall_thickness_ultra: model.minimum_wall_thickness_ultra,
        minimum_wall_thickness_class_2: model.minimum_wall_thickness_class_2,
        minimum_wall_thickness_premium: model.minimum_wall_thickness_premium,

    }
}
