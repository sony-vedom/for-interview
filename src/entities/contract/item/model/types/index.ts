export interface Contract {
    name: string
    consumer_id: number
    id: number
}

export type ContractCreate = Omit<Contract, 'id'>

export type ContractEdit = Omit<Contract, 'id'>
