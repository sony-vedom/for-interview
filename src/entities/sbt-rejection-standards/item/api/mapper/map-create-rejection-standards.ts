import { SbtRejectionStandardsCreate } from '../../model'
import {
    SbtRejectionStandardsCreateDto,
} from 'entities/sbt-rejection-standards/item/api/dto'

export const mapCreateSbtRejectionStandards = (dto: SbtRejectionStandardsCreate): SbtRejectionStandardsCreateDto => ({
    nominal_pipe_diameter: dto.nominal_pipe_diameter,
    wall_thickness: dto.wall_thickness,
    strength_group: dto.strength_group,

    minimum_outer_diameter_ultra: dto.ultra?.minimum_outer_diameter,
    maximum_inner_diameter_ultra: dto.ultra?.maximum_inner_diameter,
    min_chamfer_diameter_ultra: dto.ultra?.min_chamfer_diameter,
    min_width_thrust_shoulder_ultra: dto.ultra?.min_width_thrust_shoulder,

    minimum_outer_diameter_premium: dto.premium?.minimum_outer_diameter,
    maximum_inner_diameter_premium: dto.premium?.maximum_inner_diameter,
    min_chamfer_diameter_premium: dto.premium?.min_chamfer_diameter,
    min_width_thrust_shoulder_premium: dto.premium?.min_width_thrust_shoulder,

    minimum_outer_diameter_class_2: dto.class_2?.minimum_outer_diameter,
    maximum_inner_diameter_class_2: dto.class_2?.maximum_inner_diameter,
    min_chamfer_diameter_class_2: dto.class_2?.min_chamfer_diameter,
    min_width_thrust_shoulder_class_2: dto.class_2?.min_width_thrust_shoulder,

    minimum_length_key_installation_location_nippel: dto.minimum_length_key_installation_location?.nipple,
    minimum_length_key_installation_location_coupling: dto.minimum_length_key_installation_location?.coupling,
    max_chamfer_diameter: dto.max_chamfer_diameter,
    maximum_boring: dto.maximum_boring,
    lock_thread_id: dto.lock_thread_id
})
