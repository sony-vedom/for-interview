import { SbtRejectionStandardsDTO } from '../dto'
import { SbtRejectionStandards } from '../../model'
import { mapThreadLockingConnection } from 'entities/sbt-rejection-standards/thread-locking-connection/@x'

export const mapSbtRejectionStandards = (dto: SbtRejectionStandardsDTO): SbtRejectionStandards => ({
    id: dto.id,

    lock_thread: mapThreadLockingConnection(dto.lock_thread),

    nominal_pipe_diameter: Number(dto.nominal_pipe_diameter),
    wall_thickness: Number(dto.wall_thickness),
    strength_group: dto.strength_group,

    ultra: {
        minimum_outer_diameter: Number(dto.minimum_outer_diameter_ultra),
        maximum_inner_diameter: Number(dto.maximum_inner_diameter_ultra),
        min_chamfer_diameter: Number(dto.min_chamfer_diameter_ultra),
        min_width_thrust_shoulder: Number(dto.min_width_thrust_shoulder_ultra)
    },
    premium: {
        minimum_outer_diameter: Number(dto.minimum_outer_diameter_premium),
        maximum_inner_diameter: Number(dto.maximum_inner_diameter_premium),
        min_chamfer_diameter: Number(dto.min_chamfer_diameter_premium),
        min_width_thrust_shoulder: Number(dto.min_width_thrust_shoulder_premium)
    },
    class_2: {
        minimum_outer_diameter: Number(dto.minimum_outer_diameter_class_2),
        maximum_inner_diameter: Number(dto.maximum_inner_diameter_class_2),
        min_chamfer_diameter: Number(dto.min_chamfer_diameter_class_2),
        min_width_thrust_shoulder: Number(dto.min_width_thrust_shoulder_class_2)
    },

    minimum_length_key_installation_location: {
        nipple: Number(dto.minimum_length_key_installation_location_nippel),
        coupling: Number(dto.minimum_length_key_installation_location_coupling)
    },

    max_chamfer_diameter: Number(dto.max_chamfer_diameter),
    maximum_boring: Number(dto.maximum_boring)
})
