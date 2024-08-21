export interface TypeTools {
    name: string
    id: number
    kind_id: number | null
    kind_name?: string
}

export type TypeToolsCreate = Omit<TypeTools, 'id'>

export type TypeToolsEdit = Omit<TypeTools, 'id'>
