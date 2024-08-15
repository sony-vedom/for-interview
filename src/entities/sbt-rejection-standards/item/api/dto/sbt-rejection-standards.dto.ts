import { ThreadLockingConnectionDto } from 'entities/sbt-rejection-standards/thread-locking-connection/@x'

export interface SbtRejectionStandardsDTO {
    nominal_pipe_diameter: string
    wall_thickness: string
    strength_group: string
    minimum_outer_diameter_ultra: string
    maximum_inner_diameter_ultra: string
    min_chamfer_diameter_ultra: string
    min_width_thrust_shoulder_ultra: string
    minimum_outer_diameter_premium: string
    maximum_inner_diameter_premium: string
    min_chamfer_diameter_premium: string
    min_width_thrust_shoulder_premium: string
    minimum_outer_diameter_class_2: string
    maximum_inner_diameter_class_2: string
    min_chamfer_diameter_class_2: string
    min_width_thrust_shoulder_class_2: string
    minimum_length_key_installation_location_nippel: string
    minimum_length_key_installation_location_coupling: string
    max_chamfer_diameter: string
    maximum_boring: string
    lock_thread: ThreadLockingConnectionDto
    id: number
}

