import { ThreadLockingConnectionDto } from './thread-locking-connection.dto.ts'

export type ThreadLockingConnectionCreateDTO = Omit<ThreadLockingConnectionDto, 'id'>
