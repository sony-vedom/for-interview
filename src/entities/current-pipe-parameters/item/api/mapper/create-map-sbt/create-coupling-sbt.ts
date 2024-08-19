import { ICreateSbtCoupling } from '../../../model/create-sbt-current-param.ts'
import { CreateSbtCouplingBuilder } from '../base-type/create-coupling-base.ts'
import { CreateSbtCouplingDTO } from '../../dto/create-sbt.dto.ts'

export const mapCreateSbtCoupling = (model: ICreateSbtCoupling) => {
    return new CreateSbtCouplingBuilder()
        .addOuterDiameter(model.outer_diameter)
        .addChamferDiameter(model.chamfer_diameter)
        .addWidthThrustShoulder(model.thrust_shoulder_width)
        .addDiameterConeRecess(model.diameter_cone_recess)
        .addDepthConeRecess(model.depth_cone_recess)
        .addKeyInstallationLocation(model.key_installation_location)
        .addCarbideSurfacing(model.carbide_surfacing)
        .addMagnet(model.magnet)
        .addVik(model.vik)
        .build() as CreateSbtCouplingDTO
}
