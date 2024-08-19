import {
    STATUS_CARBIDE_SURFACING_COLLAPSE,
    STATUS_CLASS,
    STATUS_DEFECTS,
    STATUS_REPAIR,
    STATUS_VIK
} from '../parameters-statuces'

export interface ICarbideSurfacing {
    carbide_surfacing: `${STATUS_CARBIDE_SURFACING_COLLAPSE}`
}



export interface IOuterDiameter {
    outer_diameter: number
}

export interface IChamferDiameter {
    chamfer_diameter: number
}

export interface IKeyInstallationLocation {
    key_installation_location: number
}

export interface IMagnet {
    magnet: `${STATUS_DEFECTS}`
}

export interface IVik {
    vik: `${STATUS_VIK}`
}

export interface IConditionLockConnection {
    condition_lock_connection: `${STATUS_REPAIR}`
}

export interface ILockConnectionClass {
    lock_connection_class: `${STATUS_CLASS}`
}