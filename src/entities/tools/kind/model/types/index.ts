export interface KindTools {
    name: string
    inspection_category_sbt: number
    inspection_category_tbt_ubt: number
    id: number
}

export type KindToolsCreate = Omit<KindTools, 'id'>

export type KindToolsEdit = Omit<KindTools, 'id'>
