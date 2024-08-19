import { IEditCurrentSbtParams } from 'entities/current-pipe-parameters/item/model/edit-sbt-current-param.ts'
import { EditSbtDTO } from 'entities/current-pipe-parameters/item/api/dto/edit-sbt.dto.ts'
import { mapEditSbtPipeBody } from 'entities/current-pipe-parameters/item/api/mapper/edit-map-sbt/edit-pipe-body-sbt.ts'
import {
    mapEditSbtNippleMapper
} from 'entities/current-pipe-parameters/item/api/mapper/edit-map-sbt/edit-nipple-sbt.ts'
import { mapEditSbtCoupling } from 'entities/current-pipe-parameters/item/api/mapper/edit-map-sbt/edit-coupling-sbt.ts'

export const mapEditSbtCurrentParameter = (
    model: IEditCurrentSbtParams
) => {
    let preparedData = {
        comment: model.comment
    }
    if (model.pipe_body) {
        preparedData = {
            ...preparedData,
            ...mapEditSbtPipeBody(model.pipe_body)
        }
    }
    if (model.nipple) {
        preparedData = {
            ...preparedData,
            ...mapEditSbtNippleMapper(model.nipple)
        }
    }
    if (model.coupling) {
        preparedData = {
            ...preparedData,
            ...mapEditSbtCoupling(model.coupling)
        }
    }
    return {
        ...preparedData,
        serial_number: model.serial_number,
        comment: model.comment
    } as EditSbtDTO
}
