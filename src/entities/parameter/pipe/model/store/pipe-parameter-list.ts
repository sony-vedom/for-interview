import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { Meta, Pagination, PaginationQuery } from 'shared/api'
import { LifeCycledModel } from 'shared/lib/mobx'
import * as pipeParameterApi from '../../api'
import { ParameterPipeQueryFilters } from '../../api/query/get-parameter-pipe.query.ts'
import { PipeParameter } from '../types'

export class PipeParameterList implements LifeCycledModel {
    private _meta: Meta = Meta.INITIAL
    private _list: Pagination<PipeParameter[]> | null = null
    private _pagination?: PaginationQuery
    private _filters?: ParameterPipeQueryFilters
    private _disposers: any[] = []

    constructor(pagination?: PaginationQuery, filters?: ParameterPipeQueryFilters) {
        this._filters = filters
        this._pagination = pagination
        makeAutoObservable(this, {}, {
            autoBind: true
        })
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

    public setFilters(filters: ParameterPipeQueryFilters) {
        this._filters = filters
    }

    get meta() {
        return this._meta
    }

    get list() {
        return this._list
    }

    private _setList(list: Pagination<PipeParameter[]>) {
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
            const res = await pipeParameterApi.getPipeParameterList(this._pagination, this._filters)
            runInAction(() => {
                this._setList(res)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }
}
