export interface Consumer {
    name: string
    inn: string
    kpp: string
    address: string
    director: string
    id: number
}

export type ConsumerCreate = Omit<Consumer, 'id'>

export type ConsumerEdit = Omit<Consumer, 'id'>
