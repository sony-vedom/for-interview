import { ThreadLockingConnectionDto } from '../dto/thread-locking-connection.dto.ts'
import { ThreadLockingConnection } from '../../model/types'

export const mapThreadLockingConnection = (dto: ThreadLockingConnectionDto): ThreadLockingConnection => ({
    id: dto.id,
    name: dto.name
})
