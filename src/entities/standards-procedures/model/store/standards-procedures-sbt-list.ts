import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import { LifeCycledModel } from 'shared/lib/mobx'
import * as standardsProceduresSbtApi from '../../api'
import { GetStandardsProceduresSbtFilters } from '../../api/query/get-standards-procedures-sbt.query.ts'
import { StandardsProceduresSbt } from 'entities/standards-procedures'

export class StandardsProceduresSbtListStore implements LifeCycledModel {
    private _meta: Meta = Meta.INITIAL
    private _list: StandardsProceduresSbt[] | null = null
    private _filters?: GetStandardsProceduresSbtFilters
    private _disposers: any[] = []

    constructor(filters?: GetStandardsProceduresSbtFilters) {
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

    public setFilters(filters: GetStandardsProceduresSbtFilters) {
        this._filters = filters
    }

    get meta() {
        return this._meta
    }

    get list() {
        return this._list
    }

    private _setList(list: StandardsProceduresSbt[]) {
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
            const res = await standardsProceduresSbtApi.getStandardsProcedureSbtList(this._filters)
            runInAction(() => {
                this._setList(res)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }
}
