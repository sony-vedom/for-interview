import { ContractEdit } from '../../model/types'
import { ContractEditDTO } from 'entities/contract/item/api/dto/contract-edit.dto.ts'

export const mapContractEdit = (model: ContractEdit): ContractEditDTO => ({
    name: model.name,
    consumer_id: model.consumer_id
})
