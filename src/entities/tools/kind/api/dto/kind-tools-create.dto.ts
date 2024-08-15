import { KindToolsDTO } from './kind-tools.dto.ts'

export type KindToolsCreateDto = Omit<KindToolsDTO, 'id'>
