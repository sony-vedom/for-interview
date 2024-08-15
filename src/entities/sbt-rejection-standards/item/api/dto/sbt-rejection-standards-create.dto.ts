type SbtRejectionStandardsNumbersDTO = {
    lock_thread_id: number
    nominal_pipe_diameter: number
    wall_thickness: number
    strength_group: string
    minimum_outer_diameter_ultra: number
    maximum_inner_diameter_ultra: number
    min_chamfer_diameter_ultra: number
    min_width_thrust_shoulder_ultra: number
    minimum_outer_diameter_premium: number
    maximum_inner_diameter_premium: number
    min_chamfer_diameter_premium: number
    min_width_thrust_shoulder_premium: number
    minimum_outer_diameter_class_2: number
    maximum_inner_diameter_class_2: number
    min_chamfer_diameter_class_2: number
    min_width_thrust_shoulder_class_2: number
    minimum_length_key_installation_location_nippel: number
    minimum_length_key_installation_location_coupling: number
    max_chamfer_diameter: number
    maximum_boring: number
}

export interface SbtRejectionStandardsCreateDto extends SbtRejectionStandardsNumbersDTO {
}
