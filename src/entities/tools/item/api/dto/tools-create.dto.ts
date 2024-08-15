import { ToolDTO } from './tool.dto.ts'

export type ToolsCreateDTO = Omit<ToolDTO, 'id' | 'is_expired' | 'in_active_report'>
