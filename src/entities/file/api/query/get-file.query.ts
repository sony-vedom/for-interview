import { Filters } from 'shared/config/api/filter.ts'

import { idNames } from 'entities/file/model/types'

export interface GetFileQuery {
    id: number
}

export interface CreateFileQuery {
    // ЭТО НЕ ID ФАЙЛА, ЭТО ID СУЩНОСТИ, К КОТОРОЙ ФАЙЛ ПРИВЯЗЫВАЕТСЯ
    id: number
}


export type GetFileQueryFilters = Filters<Partial<{
    [key in idNames]: number
}>>
