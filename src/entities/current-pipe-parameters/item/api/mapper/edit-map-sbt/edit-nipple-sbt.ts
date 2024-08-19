import { CreateSbtNipple } from '../base-type/create-nipple-base.ts'
import { IEditSbtNipple } from 'entities/current-pipe-parameters/item/model/edit-sbt-current-param.ts'
import { EditSbtNippleDTO } from 'entities/current-pipe-parameters/item/api/dto/edit-sbt.dto.ts'

export const mapEditSbtNippleMapper = (model: IEditSbtNipple) => {
    return new CreateSbtNipple()
        .addOuterDiameter(model.outer_diameter)
        .addChamferDiameter(model.chamfer_diameter)
        .addThreadLength(model.thread_length)
        .addInnerDiameter(model.inner_diameter)
        .addKeyInstallationLocation(model.key_installation_location)
        // .addCarbideSurfacing(model.carbide_surfacing)
        .addMagnet(model.magnet)
        .addVik(model.vik)
        .build() as EditSbtNippleDTO
}
