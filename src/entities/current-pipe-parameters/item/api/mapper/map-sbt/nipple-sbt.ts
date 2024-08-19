import { ISbtDTONipple } from 'entities/current-pipe-parameters/item/api/dto/sbt.dto.ts'
import { NippleBuilder } from 'entities/current-pipe-parameters/item/api/mapper/base-type/nipple-coupling-base.ts'
import { ISbtNipple } from 'entities/current-pipe-parameters/item/model/sbt-current-param.ts'


export const mapSbtNipple = (dto: ISbtDTONipple) => {
    return new NippleBuilder({
        outer_diameter: Number(dto.outer_diameter_nipple),
        chamfer_diameter: Number(dto.chamfer_diameter_nipple),
        key_installation_location: Number(dto.key_installation_location_nipple)
    })
        .addThreadLength(Number(dto.nipple_thread_length))
        .addInnerDiameter(Number(dto.inner_diameter_nipple))
        // .addCarbideSurfacing(dto.сarbide_surfacing_nipple)
        .addMagnet(dto.magnet_nipple)
        .addVik(dto.vik_nipple)
        .addConditionLockConnection(dto.condition_lock_connection_nipple)
        .addLockConnectionClass(dto.lock_connection_class_nipple)
        .build() as ISbtNipple
}
