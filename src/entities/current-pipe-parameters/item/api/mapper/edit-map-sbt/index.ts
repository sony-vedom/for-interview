import { IEditCurrentSbtParams } from 'entities/current-pipe-parameters/item/model/edit-sbt-current-param.ts'
import { EditSbtDTO } from 'entities/current-pipe-parameters/item/api/dto/edit-sbt.dto.ts'
import { mapEditSbtPipeBody } from 'entities/current-pipe-parameters/item/api/mapper/edit-map-sbt/edit-pipe-body-sbt.ts'
import {
    mapEditSbtNippleMapper
} from 'entities/current-pipe-parameters/item/api/mapper/edit-map-sbt/edit-nipple-sbt.ts'
import { mapEditSbtCoupling } from 'entities/current-pipe-parameters/item/api/mapper/edit-map-sbt/edit-coupling-sbt.ts'
import { mapEditBasePipe } from 'entities/current-pipe-parameters/item/api/mapper/base-type/pipe.ts'

export const mapEditSbtCurrentParameter = (
    model: IEditCurrentSbtParams
) => {
    return {
        ...mapEditBasePipe(model),
        ...mapEditSbtPipeBody(model.pipe_body),
        ...mapEditSbtNippleMapper(model.nipple),
        ...mapEditSbtCoupling(model.coupling)
    } as EditSbtDTO
}
