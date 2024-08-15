import { Filters } from 'shared/config/api/filter.ts'
import { Consumer } from '../../model'

export interface GetConsumerQuery {
    consumer_id: number
}

export interface ContractFiltersParams extends Omit<Consumer, "id"> {
}

export type GetConsumerQueryFilters = Filters<ContractFiltersParams>
