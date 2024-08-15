import { ConsumerCreate } from '../../model/types'
import { ConsumerCreateDTO } from '../dto/consumer-create.dto.ts'

export const mapConsumerEdit = (model: ConsumerCreate): ConsumerCreateDTO => ({
    name: model.name,
    inn: model.inn,
    kpp: model.kpp,
    address: model.address,
    director: model.director
})
