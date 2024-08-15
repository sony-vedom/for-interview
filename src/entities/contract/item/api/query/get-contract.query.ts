import { Filters } from 'shared/config/api/filter.ts'
import { Contract } from 'entities/contract/item'

export interface GetContractQuery {
    contract_id: number
}

export interface ContractFiltersParams extends Omit<Contract, "id"> {
}

export type GetContractQueryFilters = Filters<ContractFiltersParams>
