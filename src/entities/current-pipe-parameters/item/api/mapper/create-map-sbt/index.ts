import { CreateSbtDTO } from '../../dto/create-sbt.dto.ts'
import { mapCreateBasePipe } from '../base-type/create-pipe.ts'
import { ICreateCurrentSbtParams } from 'entities/current-pipe-parameters/item/model/create-sbt-current-param.ts'
import {
    mapCreateSbtPipeBody
} from 'entities/current-pipe-parameters/item/api/mapper/create-map-sbt/create-pipe-body-sbt.ts'
import {
    mapCreateSbtNippleMapper
} from 'entities/current-pipe-parameters/item/api/mapper/create-map-sbt/create-nipple-sbt.ts'
import {
    mapCreateSbtCoupling
} from 'entities/current-pipe-parameters/item/api/mapper/create-map-sbt/create-coupling-sbt.ts'

export const mapCreateSbtCurrentParameter = (
    model: ICreateCurrentSbtParams
) => {
    return {
        ...mapCreateBasePipe(model),
        ...mapCreateSbtPipeBody(model.pipe_body),
        ...mapCreateSbtNippleMapper(model.nipple),
        ...mapCreateSbtCoupling(model.coupling),
        minimum_wall_thickness_ultra: model.minimum_wall_thickness_ultra,
        minimum_wall_thickness_premium: model.minimum_wall_thickness_premium,
        minimum_wall_thickness_class_2: model.minimum_wall_thickness_class_2

    } as CreateSbtDTO
}
