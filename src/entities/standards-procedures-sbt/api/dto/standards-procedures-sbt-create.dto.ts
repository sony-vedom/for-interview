import { StandardsProceduresSbtDto } from './standards-procedures-sbt.dto.ts'

export type StandardsProceduresSbtCreateDto = Omit<StandardsProceduresSbtDto, 'id' | 'name'>
