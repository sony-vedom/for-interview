import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { Meta, Pagination, PaginationQuery } from 'shared/api'
import { LifeCycledModel } from 'shared/lib/mobx'
import * as currentPipeParameters from '../../api'
import { GetContractQueryFilters } from 'entities/current-pipe-parameters/item/api/query/current-parameter.query.ts'
import { ICurrentSbtParams } from 'entities/current-pipe-parameters/item/model/sbt-current-param.ts'

export class CurrentPipeParametersList implements LifeCycledModel {
    private _meta: Meta = Meta.INITIAL
    private _list: Pagination<ICurrentSbtParams[]> | null = null
    private _filters?: GetContractQueryFilters
    private _disposers: any[] = []
    private _pagination?: PaginationQuery = {
        page_index: 0,
        page_size: 15
    }

    constructor(filters?: GetContractQueryFilters) {
        this._filters = filters
        makeAutoObservable(this, {})
        this._disposers.push(
            reaction(() => this._filters, () => {
                this.load()
            })
        )
        this._disposers.push(
            reaction(() => this._pagination, () => {
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

    public setFilters(filters: GetContractQueryFilters) {
        this._filters = filters
    }

    get meta() {
        return this._meta
    }

    get pagination() {
        return this._pagination
    }

    get list() {
        return this._list
    }

    private _setList(list: Pagination<ICurrentSbtParams[]>) {
        this._list = list
    }

    private _setMeta(meta: Meta) {
        this._meta = meta
    }

    setPagination(pagination: PaginationQuery) {
        this._pagination = pagination
    }

    public async load() {
        if (!this._list) {
            this._setMeta(Meta.LOADING)
        } else {
            this._setMeta(Meta.FETCHING)
        }
        try {
            const res = await currentPipeParameters
                .getCurrentParamList(this._pagination ? {
                    page_index: this._pagination.page_index + 1,
                    page_size: this._pagination.page_size
                } : undefined, this._filters)
            runInAction(() => {
                this._setList(res)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }
}
