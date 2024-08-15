import { Filters } from 'shared/config/api/filter.ts'
import { KindTools } from 'entities/tools/kind/model/types'

export interface GetThreadLockingConnectionQuery {
    thread_locking_connection_id: number
}

export interface ThreadLockingConnectionFiltersParams extends KindTools {
}

export type GetThreadLockingConnectionQueryFilters = Filters<ThreadLockingConnectionFiltersParams>
