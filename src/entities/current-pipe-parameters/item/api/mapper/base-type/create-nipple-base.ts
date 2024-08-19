import {
    STATUS_CARBIDE_SURFACING_COLLAPSE,
    STATUS_DEFECTS,
    STATUS_VIK
} from '../../../model/parameters-statuces'
import { CreateSbtNippleDTO } from '../../dto/create-sbt.dto'

export class CreateSbtNipple implements Partial<CreateSbtNippleDTO> {
    outer_diameter_nipple?: number
    chamfer_diameter_nipple?: number
    nipple_thread_length?: number
    key_installation_location_nipple?: number
    inner_diameter_nipple?: number
    сarbide_surfacing_nipple?: `${STATUS_CARBIDE_SURFACING_COLLAPSE}`
    magnet_nipple?: `${STATUS_DEFECTS}`
    vik_nipple?: `${STATUS_VIK}`

    addOuterDiameter(outer_diameter_nipple: typeof this.outer_diameter_nipple) {
        this.outer_diameter_nipple = outer_diameter_nipple
        return this
    }

    addChamferDiameter(
        chamfer_diameter_nipple: typeof this.chamfer_diameter_nipple
    ) {
        this.chamfer_diameter_nipple = chamfer_diameter_nipple
        return this
    }

    addThreadLength(nipple_thread_length: typeof this.nipple_thread_length) {
        this.nipple_thread_length = nipple_thread_length
        return this
    }

    addInnerDiameter(inner_diameter_nipple: typeof this.inner_diameter_nipple) {
        this.inner_diameter_nipple = inner_diameter_nipple
        return this
    }

    addKeyInstallationLocation(
        key_installation_location_nipple: typeof this.key_installation_location_nipple
    ) {
        this.key_installation_location_nipple = key_installation_location_nipple
        return this
    }

    // addCarbideSurfacing(
    //     carbide_surfacing_nipple: typeof this.сarbide_surfacing_nipple
    // ) {
    //     this.сarbide_surfacing_nipple = carbide_surfacing_nipple
    //     return this
    // }

    addMagnet(magnet_nipple: typeof this.magnet_nipple) {
        this.magnet_nipple = magnet_nipple
        return this
    }

    addVik(vik_nipple: typeof this.vik_nipple) {
        this.vik_nipple = vik_nipple
        return this
    }

    build() {
        return this
    }
}
