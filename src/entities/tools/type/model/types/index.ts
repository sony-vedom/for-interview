export interface TypeTools {
    name: string
    id: number
}

export type TypeToolsCreate = Omit<TypeTools, 'id'>

export type TypeToolsEdit = Omit<TypeTools, 'id'>
