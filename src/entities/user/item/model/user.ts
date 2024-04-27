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
    username: string
    role: Role
}
