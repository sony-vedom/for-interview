import { ContractDTO } from './contract.dto.ts'

export type ContractEditDTO = Omit<ContractDTO, 'id'>
