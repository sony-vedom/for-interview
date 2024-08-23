export interface PagesDescription {
    id: number
    pathName: string
}

export interface Role {
    id: number
    name: string
    edit: PagesDescription[]
    read: PagesDescription[]

}

export interface User {
    id: number
    login: string

    first_name: string | null
    last_name: string | null
    second_name: null | string

    position_id: null | number
    position_name?: string

    role: Role | null
    is_superuser: boolean
}

export type UserWithPositionName = User & {
    position_name?: null | string
}

export type UserEdit = Partial<Omit<User, "id">>