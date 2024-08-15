import { ThreadLockingConnectionEdit } from '../../model/types'
import {
    ThreadLockingConnectionEditDTO
} from '../../api/dto/thread-locking-connection-edit.dto.ts'

export const mapThreadLockingConnectionEdit = (model: ThreadLockingConnectionEdit): ThreadLockingConnectionEditDTO => ({
    name: model.name
})
