import { ICreateMainPipeCurrentParam } from '../../../model/base-type/base-pipe-current-param.ts'
import { CreateMainInfoPipeDTO } from '../../dto/base-type/create-pipe.dto.ts'

export const mapCreateBasePipe = (model: ICreateMainPipeCurrentParam) => {
    return {
        serial_number: model.serial_number,
        report_id: model.report_id,
        comment: model.comment,
        standards_procedures: model.standards_procedures,
        rejection_standard_id: model.rejection_standard_id
    } as CreateMainInfoPipeDTO
}
