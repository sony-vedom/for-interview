import { PipeParameterDto } from '../dto/pipe-parameter.dto.ts'
import { PipeParameter } from '../../model/types'

export const mapPipeParameter = (dto: PipeParameterDto): PipeParameter => ({
    id: dto.id,
    name: dto.name,
    nominal_pipe_diameter: dto.nominal_pipe_diameter,
    weight_foot: dto.weight_foot,
    reinforcement: dto.reinforcement,
    internal_coating: dto.internal_coating,
    pipe_inner_diameter: dto.pipe_inner_diameter,
    lock_outside_diameter: dto.lock_outside_diameter,
    lock_inner_diameter: dto.lock_inner_diameter,
    strength_group: dto.strength_group,
    size_range: dto.size_range,
    lock_thread: dto.lock_thread,
    lock_type: dto.lock_type,
    wall_thickness: dto.wall_thickness,
    length: dto.length,
    pipe_type: dto.pipe_type,
    side_square: dto.side_square,
    sub_pipe_type: dto.sub_pipe_type
})
