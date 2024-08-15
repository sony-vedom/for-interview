import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import * as kindToolsApi from '../../api'
import { ThreadLockingConnectionList } from './thread-locking-connection-list.ts'
import { ThreadLockingConnection, ThreadLockingConnectionCreate, ThreadLockingConnectionEdit } from '../types'

export class ThreadLockingConnectionStore {
    private _meta: Meta = Meta.INITIAL
    private _elem: ThreadLockingConnection | null = null
    private _root?: ThreadLockingConnectionList

    constructor({ id, root }: { id?: number | null, root?: ThreadLockingConnectionList }) {
        this._root = root
        makeAutoObservable<this, '_root'>(this, {
            _root: false
        })
        if (id) {
            this.init(id)
        }
    }

    get meta() {
        return this._meta
    }

    get elem() {
        return this._elem
    }

    private _setMedicalExamination(position: ThreadLockingConnection) {
        this._elem = position
    }

    private _setMeta(meta: Meta) {
        this._meta = meta
    }

    public init(id: number) {
        this.load(id)
    }

    public async load(id: number) {
        this._setMeta(Meta.LOADING)
        try {
            const positionResponse = await kindToolsApi.getThreadLockingConnection({
                thread_locking_connection_id: id
            })
            runInAction(() => {
                this._setMedicalExamination(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }

    public async create(body: ThreadLockingConnectionCreate) {
        this._setMeta(Meta.SAVING)
        try {
            const positionResponse = await kindToolsApi.createThreadLockingConnection({
                ...body
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setMedicalExamination(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }

    public async edit(id: number, body: ThreadLockingConnectionEdit) {
        this._setMeta(Meta.EDITING)
        try {
            const positionResponse = await kindToolsApi.editThreadLockingConnection({
                thread_locking_connection_id: id,
                ...body
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setMedicalExamination(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }

    public async delete(id: number) {
        this._setMeta(Meta.DELETING)
        try {
            const positionResponse = await kindToolsApi.deleteThreadLockingConnection({
                thread_locking_connection_id: id
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setMedicalExamination(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }
}
