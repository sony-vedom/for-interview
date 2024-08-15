import { ThreadLockingConnectionDto } from './thread-locking-connection.dto.ts'

export type ThreadLockingConnectionEditDTO = Omit<ThreadLockingConnectionDto, 'id'>
