import { ConsumerDTO } from '../dto/consumer.dto.ts'
import { Consumer } from '../../model/types'

export const mapConsumer = (dto: ConsumerDTO): Consumer => ({
    name: dto.name,
    inn: dto.inn,
    kpp: dto.kpp,
    address: dto.address,
    director: dto.director,
    id: dto.id
})
