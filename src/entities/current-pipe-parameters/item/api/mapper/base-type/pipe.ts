import { IMainInfoDTO } from '../../dto/base-type/pipe.dto.ts'

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
