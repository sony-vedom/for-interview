export interface ThreadLockingConnection {
    name: string
    id: number
}

export type ThreadLockingConnectionCreate = Omit<ThreadLockingConnection, 'id'>

export type ThreadLockingConnectionEdit = Omit<ThreadLockingConnection, 'id'>
