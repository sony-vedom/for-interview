import { apiInstance } from 'shared/api'
import {
    Contract,
    ContractCreate,
    ContractEdit
} from '../model/types'
import { ContractDTO } from './dto/contract.dto.ts'
import { mapContract } from './mapper/map-contract.ts'
import {
    GetContractQuery, GetContractQueryFilters
} from './query/get-contract.query.ts'
import {
    mapContractEdit
} from './mapper/map-contract-edit.ts'
import { preparedQueryParamsForRequest } from 'shared/lib/helpers'
import { mapContractCreate } from 'entities/contract/item/api/mapper/map-contract-create.ts'
import { getConsumer } from 'entities/consumer/item/@x'


const BASE_URL = '/contract/'

export const getContracts = async (filters?: GetContractQueryFilters): Promise<Contract[]> => {
    const res = await apiInstance.get<ContractDTO[]>(`${BASE_URL}`, {
        params: preparedQueryParamsForRequest(undefined, filters)
    })
    const preparedContractsList = res.data.map(mapContract)
    return await Promise.all(preparedContractsList.map(async (el) => {
        if (el.consumer_id) {
            const resKind = await getConsumer({ consumer_id: el.consumer_id })
            return {
                ...el,
                consumer_name: resKind.name
            }
        }
        return el
    }))
}

export const createContract = async (body: ContractCreate): Promise<Contract> => {
    const res = await apiInstance.post<ContractDTO>(`${BASE_URL}`, mapContractCreate(body))
    return {
        ...mapContract(res.data)
    }
}

export const getContract = async (params: GetContractQuery): Promise<Contract> => {
    const res = await apiInstance.get<ContractDTO>(`${BASE_URL}${params.contract_id}`)
    return {
        ...mapContract(res.data)
    }
}

export const editContract = async (params: GetContractQuery & ContractEdit): Promise<Contract> => {
    const { contract_id, ...rest } = params
    const res = await apiInstance.patch<ContractDTO>(`${BASE_URL}${contract_id}`,
        mapContractEdit(rest))
    return {
        ...mapContract(res.data)
    }
}

export const deleteContract = async (params: GetContractQuery): Promise<any> => {
    return await apiInstance.delete(`${BASE_URL}${params.contract_id}`)
}
