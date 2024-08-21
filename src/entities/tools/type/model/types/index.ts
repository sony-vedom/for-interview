export interface TypeTools {
    name: string
    id: number
    kind_id: number | null
}

export type TypeToolsCreate = Omit<TypeTools, 'id'>

export type TypeToolsEdit = Omit<TypeTools, 'id'>
