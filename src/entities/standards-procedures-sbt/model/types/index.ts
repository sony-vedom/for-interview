export interface StandardsProceduresSbt {
    standards_description: string
    inspection_category: number
    id: number
    name: string
}

export type StandardsProceduresSbtCreate = Omit<StandardsProceduresSbt, 'id' | 'name'>

export type StandardsProceduresSbtEdit = Omit<StandardsProceduresSbt, 'id' | 'name'>
