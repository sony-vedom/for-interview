export interface PagesDescription {
    id: number
    displayName: string
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
    username: string
    role: Role
}
