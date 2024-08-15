import { ContractCreate } from '../../model/types'
import { ContractCreateDTO } from '../dto/contract-create.dto.ts'

export const mapContractEdit = (model: ContractCreate): ContractCreateDTO => ({
    name: model.name,
    consumer_id: model.consumer_id,
})
