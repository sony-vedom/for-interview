import { KindToolsDTO } from './kind-tools.dto.ts'

export type KindToolsEditDto = Omit<KindToolsDTO, 'id' | 'is_expired'>
