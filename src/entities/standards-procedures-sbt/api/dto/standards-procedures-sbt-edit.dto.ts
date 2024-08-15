import { StandardsProceduresSbtDto } from './standards-procedures-sbt.dto.ts'

export type StandardsProceduresSbtEditDto = Omit<StandardsProceduresSbtDto, 'id' | 'name'>
