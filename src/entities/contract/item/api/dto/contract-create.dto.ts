import { ContractDTO } from './contract.dto.ts'

export type ContractCreateDTO = Omit<ContractDTO, 'id'>
