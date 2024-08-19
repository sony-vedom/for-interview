import { ISbtDTOPipeBody } from 'entities/current-pipe-parameters/item/api/dto/sbt.dto.ts'
import { ISbtPipeBody } from 'entities/current-pipe-parameters/item/model/sbt-current-param.ts'


export const mapSbtPipeBody = (dto: ISbtDTOPipeBody) => {
    return {
        total_length: Number(dto.total_length),
        wall_thickness: Number(dto.average_wall_thickness),
        condition_inner_coating: dto.condition_inner_coating,
        curvature: dto.curvature,
        emc: dto.emc,
        outer_diameter_wear: dto.outer_diameter_wear,
        ultrasound_landing_zones: dto.ultrasound_landing_zones,
        magnet_landing_zones: dto.magnet_landing_zones,
        inspection_landing_zones: dto.inspection_landing_zones,
        body_class: dto.pipe_body_class
    } as ISbtPipeBody
}
