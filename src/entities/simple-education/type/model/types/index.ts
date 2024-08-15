export interface TypesSimpleEducation {
    name: string
    id: number
}

export type TypesSimpleEducationCreate = Omit<TypesSimpleEducation, "id">

export type TypesSimpleEducationEdit = Omit<TypesSimpleEducation, "id">
