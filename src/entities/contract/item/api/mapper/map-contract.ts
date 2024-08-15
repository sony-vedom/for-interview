import { ContractDTO } from '../dto/contract.dto.ts'
import { Contract } from '../../model/types'

export const mapContract = (dto: ContractDTO): Contract => ({
    name: dto.name,
    consumer_id: dto.consumer_id,
    id: dto.id
})
