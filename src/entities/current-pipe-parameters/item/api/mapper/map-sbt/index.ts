import { mapBasePipe } from 'entities/current-pipe-parameters/item/api/mapper/base-type/pipe.ts'
import { ICurrentSbtParamsDTO } from 'entities/current-pipe-parameters/item/api/dto/sbt.dto.ts'
import { mapSbtPipeBody } from 'entities/current-pipe-parameters/item/api/mapper/map-sbt/pipe-body-sbt.ts'
import { mapSbtNipple } from 'entities/current-pipe-parameters/item/api/mapper/map-sbt/nipple-sbt.ts'
import { mapSbtCoupling } from 'entities/current-pipe-parameters/item/api/mapper/map-sbt/coupling-sbt.ts'
import { ICurrentSbtParams } from 'entities/current-pipe-parameters/item/model/sbt-current-param.ts'


export const mapSbtCurrentParameter = (dto: ICurrentSbtParamsDTO) => {
    return {
        ...mapBasePipe(dto),
        pipe_body: mapSbtPipeBody(dto),
        nipple: mapSbtNipple(dto),
        coupling: mapSbtCoupling(dto)
    } as ICurrentSbtParams
}
