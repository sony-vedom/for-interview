import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { Meta, Pagination, PaginationQuery } from 'shared/api'
import { LifeCycledModel } from 'shared/lib/mobx'
import * as toolsApi from '../../api'
import { GetToolsQueryFilters } from '../../api/query/get-tools.query.ts'
import { Tool } from 'entities/tools/item/model/types'

export class ToolsList implements LifeCycledModel {
    private _meta: Meta = Meta.INITIAL
    private _list: Pagination<Tool[]> | null = null
    private _paginationParams?: PaginationQuery
    private _filters?: GetToolsQueryFilters
    private _disposers: any[] = []

    constructor(filters?: GetToolsQueryFilters) {
        this._filters = filters
        makeAutoObservable(this, {})
        this._disposers.push(
            reaction(() => this._filters, () => {
                this.load()
            })
        )
    }

    get queryParams() {
        return [
            this._paginationParams,
            this._filters
        ]
    }

    public init() {
        this.load()
    }

    public destroy() {
        this._disposers.forEach(dispose => dispose())
        this._disposers = []
    }

    public setFilters(filters: GetToolsQueryFilters) {
        this._filters = filters
    }

    get meta() {
        return this._meta
    }

    get list() {
        return this._list
    }

    private _setList(list: Pagination<Tool[]>) {
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
            const res = await toolsApi
                .getToolsList(this._paginationParams, this._filters)
            runInAction(() => {
                this._setList(res)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }
}
