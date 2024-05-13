export interface PipeParameter {
    id: number
    name: string
    nominal_pipe_diameter: number
    weight: number
    reinforcement: boolean
    internal_coating: boolean
    pipe_inner_diameter: number
    lock_outside_diameter: number
    lock_inner_diameter: number
    strength_group: string | null
    size_range: string | null
    lock_thread: string
    lock_type: string | null
    type_shoulder_pad: string
    wall_thickness: number | null
    pipe_type: string
    side_square: null | string
    sub_pipe_type: null | string
}

