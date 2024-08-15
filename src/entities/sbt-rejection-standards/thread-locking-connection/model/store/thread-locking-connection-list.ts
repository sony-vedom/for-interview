import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import { LifeCycledModel } from 'shared/lib/mobx'
import { GetThreadLockingConnectionQueryFilters } from '../../api/query/get-thread-locking-connection.query.ts'
import { ThreadLockingConnection } from '../types'
import * as threadLockingConnectionApi from '../../api'

export class ThreadLockingConnectionList implements LifeCycledModel {
    private _meta: Meta = Meta.INITIAL
    private _list: ThreadLockingConnection[] | null = null
    private _filters?: GetThreadLockingConnectionQueryFilters
    private _disposers: any[] = []

    constructor(filters?: GetThreadLockingConnectionQueryFilters) {
        this._filters = filters
        makeAutoObservable(this, {})
        this._disposers.push(
            reaction(() => this._filters, () => {
                this.load()
            })
        )
    }

    public init() {
        this.load()
    }

    public destroy() {
        this._disposers.forEach(dispose => dispose())
        this._disposers = []
    }

    public setFilters(filters: GetThreadLockingConnectionQueryFilters) {
        this._filters = filters
    }

    get meta() {
        return this._meta
    }

    get list() {
        return this._list
    }

    private _setList(list: ThreadLockingConnection[]) {
        this._list = list
    }

    private _setMeta(meta: Meta) {
        this._meta = meta
    }

    public async load() {

        if (!this._list) {
            this._setMeta(Meta.LOADING)
        } else {
            this._setMeta(Meta.FETCHING)
        }
        try {
            const res = await threadLockingConnectionApi
                .getThreadLockingConnectionList(this._filters)
            runInAction(() => {
                this._setList(res)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }
}
