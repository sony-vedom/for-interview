import { Filters } from 'shared/config/api/filter.ts'
import { ICurrentSbtParamsDTO } from 'entities/current-pipe-parameters/item/api/dto/sbt.dto.ts'

export type CurrentParamByIdQuery = {
    current_params_id: number
}

export type CurrentParamBySerialNumberQuery = {
    serial_number: string
}

export interface ContractFiltersParams extends Omit<ICurrentSbtParamsDTO, "id"> {
}

export type GetContractQueryFilters = Filters<ContractFiltersParams>
