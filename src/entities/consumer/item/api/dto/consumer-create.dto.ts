import { ConsumerDTO } from './consumer.dto.ts'

export type ConsumerCreateDTO = Omit<ConsumerDTO, 'id'>
