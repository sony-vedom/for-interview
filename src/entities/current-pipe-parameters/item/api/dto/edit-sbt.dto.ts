import {
    ISbtDTOCoupling,
    ISbtDTONipple,
    ISbtDTOPipeBody
} from './sbt.dto'
import { EditMainInfoPipeDTO } from 'entities/current-pipe-parameters/item/api/dto/base-type/edit-pipe.dto.ts'

type OverrideEditSbtPipeBodyDTO = 'average_wall_thickness' | 'total_length'

export interface EditSbtPipeBodyDTO
    extends Omit<
        ISbtDTOPipeBody,
        'pipe_body_class' | OverrideEditSbtPipeBodyDTO
    > {
    average_wall_thickness: number
    total_length: number
}

type OverrideEditSbtNippleDTO =
    | 'outer_diameter_nipple'
    | 'chamfer_diameter_nipple'
    | 'nipple_thread_length'
    | 'key_installation_location_nipple'
    | 'inner_diameter_nipple'

export interface EditSbtNippleDTO
    extends Omit<
        ISbtDTONipple,
        | 'condition_lock_connection_nipple'
        | 'lock_connection_class_nipple'
        | OverrideEditSbtNippleDTO
    > {
    outer_diameter_nipple: number
    chamfer_diameter_nipple: number
    nipple_thread_length: number
    key_installation_location_nipple: number
    inner_diameter_nipple: number
}

type OverrideEditSbtCouplingDTO =
    | 'outer_diameter_coupling'
    | 'chamfer_diameter_coupling'
    | 'width_thrust_shoulder_coupling'
    | 'diameter_cone_recess_coupling'
    | 'depth_cone_recess_coupling'
    | 'key_installation_location_coupling'

export interface EditSbtCouplingDTO
    extends Omit<
        ISbtDTOCoupling,
        | 'condition_lock_connection_coupling'
        | 'lock_connection_class_coupling'
        | OverrideEditSbtCouplingDTO
    > {
    outer_diameter_coupling: number
    chamfer_diameter_coupling: number
    width_thrust_shoulder_coupling: number
    diameter_cone_recess_coupling: number
    depth_cone_recess_coupling: number
    key_installation_location_coupling: number
}

export type EditSbtDTO = Partial<EditSbtPipeBodyDTO &
    EditSbtNippleDTO &
    EditSbtCouplingDTO &
    EditMainInfoPipeDTO>

