import { CouplingBuilder } from '../base-type/nipple-coupling-base.ts'
import { ISbtDTOCoupling } from 'entities/current-pipe-parameters/item/api/dto/sbt.dto.ts'
import { ISbtCoupling } from 'entities/current-pipe-parameters/item/model/sbt-current-param.ts'

export const mapSbtCoupling = (dto: ISbtDTOCoupling) => {
    return new CouplingBuilder({
        outer_diameter: Number(dto.outer_diameter_coupling),
        chamfer_diameter: Number(dto.chamfer_diameter_coupling),
        key_installation_location: Number(
            dto.key_installation_location_coupling
        )
    })
        .addThrustSholderWidth(Number(dto.width_thrust_shoulder_coupling))
        .addDiameterConeReccess(Number(dto.diameter_cone_recess_coupling))
        .addDepthCodeRecess(Number(dto.depth_cone_recess_coupling))
        .addCarbideSurfacing(dto.сarbide_surfacing_coupling)
        .addLockConnectionClass(dto.lock_connection_class_coupling)
        .addVik(dto.vik_coupling)
        .addMagnet(dto.magnet_coupling)
        .addConditionLockConnection(dto.condition_lock_connection_coupling)
        .build() as ISbtCoupling
}
