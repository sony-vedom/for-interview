import { ToolDTO } from './tool.dto.ts'

export type ToolsEditDTO = Omit<ToolDTO, 'id' | 'is_expired'>
