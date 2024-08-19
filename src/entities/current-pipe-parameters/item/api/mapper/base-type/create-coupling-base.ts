import {
    STATUS_CARBIDE_SURFACING_COLLAPSE,
    STATUS_DEFECTS,
    STATUS_VIK
} from '../../../model/parameters-statuces'
import { CreateSbtCouplingDTO } from '../../dto/create-sbt.dto.ts'

export class CreateSbtCouplingBuilder implements Partial<CreateSbtCouplingDTO> {
    outer_diameter_coupling?: number
    chamfer_diameter_coupling?: number
    width_thrust_shoulder_coupling?: number
    diameter_cone_recess_coupling?: number
    depth_cone_recess_coupling?: number
    key_installation_location_coupling?: number
    сarbide_surfacing_coupling?: `${STATUS_CARBIDE_SURFACING_COLLAPSE}`
    magnet_coupling?: `${STATUS_DEFECTS}`
    vik_coupling?: `${STATUS_VIK}`

    addOuterDiameter(
        outer_diameter_coupling: typeof this.outer_diameter_coupling
    ) {
        this.outer_diameter_coupling = outer_diameter_coupling
        return this
    }

    addChamferDiameter(
        chamfer_diameter_coupling: typeof this.chamfer_diameter_coupling
    ) {
        this.chamfer_diameter_coupling = chamfer_diameter_coupling
        return this
    }

    addWidthThrustShoulder(
        width_thrust_shoulder_coupling: typeof this.width_thrust_shoulder_coupling
    ) {
        this.width_thrust_shoulder_coupling = width_thrust_shoulder_coupling
        return this
    }

    addDiameterConeRecess(
        diameter_cone_recess_coupling: typeof this.diameter_cone_recess_coupling
    ) {
        this.diameter_cone_recess_coupling = diameter_cone_recess_coupling
        return this
    }

    addDepthConeRecess(
        depth_cone_recess_coupling: typeof this.depth_cone_recess_coupling
    ) {
        this.depth_cone_recess_coupling = depth_cone_recess_coupling
        return this
    }

    addKeyInstallationLocation(
        key_installation_location_coupling: typeof this.key_installation_location_coupling
    ) {
        this.key_installation_location_coupling =
            key_installation_location_coupling
        return this
    }

    addCarbideSurfacing(
        carbide_surfacing_coupling: typeof this.сarbide_surfacing_coupling
    ) {
        this.сarbide_surfacing_coupling = carbide_surfacing_coupling
        return this
    }

    addMagnet(magnet_coupling: typeof this.magnet_coupling) {
        this.magnet_coupling = magnet_coupling
        return this
    }

    addVik(vik_coupling: typeof this.vik_coupling) {
        this.vik_coupling = vik_coupling
        return this
    }

    build() {
        return this
    }
}


