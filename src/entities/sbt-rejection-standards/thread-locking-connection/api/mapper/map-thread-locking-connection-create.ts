import { ThreadLockingConnectionCreate } from '../../model/types'
import { ThreadLockingConnectionCreateDTO } from '../dto/thread-locking-connection-create.dto.ts'

export const mapThreadLockingConnectionCreate = (model: ThreadLockingConnectionCreate): ThreadLockingConnectionCreateDTO => ({
    name: model.name
})
