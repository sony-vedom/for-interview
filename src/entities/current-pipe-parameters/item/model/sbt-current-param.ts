import {
    STATUS_CARBIDE_SURFACING_COLLAPSE,
    STATUS_CLASS,
    STATUS_DEFECTS, STATUS_VIK_PIPE
} from './parameters-statuces'
import {
    ICarbideSurfacing,
    IChamferDiameter,
    IConditionLockConnection,
    IKeyInstallationLocation,
    ILockConnectionClass,
    IMagnet,
    IOuterDiameter,
    IVik,
    IBasePipeCurrentParam
} from './base-type'

interface CommonParametersNippleAndCoupling
    extends IOuterDiameter,
        IChamferDiameter,
        ICarbideSurfacing,
        IKeyInstallationLocation,
        IMagnet,
        IVik,
        IConditionLockConnection,
        ILockConnectionClass {}

export interface ISbtNipple extends CommonParametersNippleAndCoupling {
    thread_length?: number
    inner_diameter: number
}

export interface ISbtCoupling extends CommonParametersNippleAndCoupling {
    thrust_shoulder_width: number
    diameter_cone_recess: number
    depth_cone_recess: number
}

export interface ISbtPipeBody {
    wall_thickness: number
    condition_inner_coating: `${STATUS_CARBIDE_SURFACING_COLLAPSE}`
    curvature: `${STATUS_DEFECTS}`
    emc: `${STATUS_DEFECTS}`
    outer_diameter_wear: `${STATUS_DEFECTS}`
    ultrasound_landing_zones: `${STATUS_DEFECTS}`
    magnet_landing_zones: `${STATUS_DEFECTS}`
    inspection_landing_zones: `${STATUS_VIK_PIPE}`
    total_length: number
    body_class: `${STATUS_CLASS}`
}

export interface ICurrentSbtParams
    extends IBasePipeCurrentParam<ISbtPipeBody, ISbtNipple, ISbtCoupling> {}
