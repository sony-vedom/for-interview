export interface PipeParameterDto {
    id: number
    name: string
    nominal_pipe_diameter: number,
    weight_foot: number,
    reinforcement: boolean,
    internal_coating: boolean,
    pipe_inner_diameter: number,
    lock_outside_diameter: number,
    lock_inner_diameter: number,
    strength_group: string,
    size_range: string,
    lock_thread: string,
    lock_type: string,
    wall_thickness: number,
    length: number,
    pipe_type: string,
    side_square: number | null,
    sub_pipe_type: string | null
}
