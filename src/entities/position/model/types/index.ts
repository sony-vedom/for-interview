export interface Position {
    name: string,
    id: number
}

export type PositionEdit = Partial<Omit<Position, "id">>

export type PositionCreate = Omit<Position, "id">