import {
    STATUS_CARBIDE_SURFACING_COLLAPSE,
    STATUS_CLASS,
    STATUS_DEFECTS,
    STATUS_REPAIR,
    STATUS_VIK, STATUS_VIK_PIPE
} from '../../model/parameters-statuces'
import { IMainInfoDTO } from './base-type/pipe.dto.ts'

export interface ISbtDTOPipeBody {
    average_wall_thickness: string
    condition_inner_coating: `${STATUS_CARBIDE_SURFACING_COLLAPSE}`
    curvature: `${STATUS_DEFECTS}`
    emc: `${STATUS_DEFECTS}`
    outer_diameter_wear: `${STATUS_DEFECTS}`
    ultrasound_landing_zones: `${STATUS_DEFECTS}`
    magnet_landing_zones: `${STATUS_DEFECTS}`
    inspection_landing_zones: `${STATUS_VIK_PIPE}`
    total_length: string
    pipe_body_class: `${STATUS_CLASS}`
}

export interface ISbtDTONipple {
    outer_diameter_nipple: string
    chamfer_diameter_nipple: string
    nipple_thread_length: string
    key_installation_location_nipple: string
    inner_diameter_nipple: string
    // не надо в строчке ниже ничего менять, это так с бэка приходит
    сarbide_surfacing_nipple: `${STATUS_CARBIDE_SURFACING_COLLAPSE}`
    magnet_nipple: `${STATUS_DEFECTS}`
    vik_nipple: `${STATUS_VIK}`
    condition_lock_connection_nipple: `${STATUS_REPAIR}`
    lock_connection_class_nipple: `${STATUS_CLASS}`
}

export interface ISbtDTOCoupling {
    outer_diameter_coupling: string
    chamfer_diameter_coupling: string
    width_thrust_shoulder_coupling: string
    diameter_cone_recess_coupling: string
    depth_cone_recess_coupling: string
    key_installation_location_coupling: string
    // не надо в строчке ниже ничего менять, это так с бэка приходит
    сarbide_surfacing_coupling: `${STATUS_CARBIDE_SURFACING_COLLAPSE}`
    magnet_coupling: `${STATUS_DEFECTS}`
    vik_coupling: `${STATUS_VIK}`
    condition_lock_connection_coupling: `${STATUS_REPAIR}`
    lock_connection_class_coupling: `${STATUS_CLASS}`
}


export type ICurrentSbtParamsDTO = ISbtDTOPipeBody &
    ISbtDTONipple &
    ISbtDTOCoupling &
    IMainInfoDTO
