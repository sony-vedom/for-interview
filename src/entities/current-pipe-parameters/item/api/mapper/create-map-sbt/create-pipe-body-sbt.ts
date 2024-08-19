import { ICreateSbtPipeBody } from '../../../model/create-sbt-current-param.ts'
import { CreateSbtPipeBodyDTO } from '../../dto/create-sbt.dto.ts'

export const mapCreateSbtPipeBody = (model: ICreateSbtPipeBody) => {
    return {
        total_length: model.total_length,
        average_wall_thickness: model.wall_thickness,
        condition_inner_coating: model.condition_inner_coating,
        curvature: model.curvature,
        emc: model.emc,
        outer_diameter_wear: model.outer_diameter_wear,
        ultrasound_landing_zones: model.ultrasound_landing_zones,
        magnet_landing_zones: model.magnet_landing_zones,
        inspection_landing_zones: model.inspection_landing_zones
    } as CreateSbtPipeBodyDTO
}
