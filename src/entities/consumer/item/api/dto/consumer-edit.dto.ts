import { ConsumerDTO } from './consumer.dto.ts'

export type ConsumerEditDTO = Omit<ConsumerDTO, 'id'>
