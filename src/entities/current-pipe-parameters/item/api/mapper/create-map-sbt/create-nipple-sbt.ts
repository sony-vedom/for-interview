import { ICreateSbtNipple } from '../../../model/create-sbt-current-param.ts'
import { CreateSbtNipple } from '../base-type/create-nipple-base.ts'
import { CreateSbtNippleDTO } from '../../dto/create-sbt.dto.ts'

export const mapCreateSbtNippleMapper = (model: ICreateSbtNipple) => {
    return new CreateSbtNipple()
        .addOuterDiameter(model.outer_diameter)
        .addChamferDiameter(model.chamfer_diameter)
        .addThreadLength(model.thread_length)
        .addInnerDiameter(model.inner_diameter)
        .addKeyInstallationLocation(model.key_installation_location)
        // .addCarbideSurfacing(model.carbide_surfacing)
        .addMagnet(model.magnet)
        .addVik(model.vik)
        .build() as CreateSbtNippleDTO
}
