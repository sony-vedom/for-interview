import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx'
import { Meta, Pagination, PaginationQuery } from 'shared/api'
import { LifeCycledModel } from 'shared/lib/mobx'
import * as toolsApi from '../../api'
import { GetToolsQueryFilters } from '../../api/query/get-tools.query.ts'
import { Tool } from 'entities/tools/item/model/types'

export class ToolsListBase {
    private _meta: Meta = Meta.INITIAL
    private _list: Pagination<Tool[]> | null = null
    private _paginationParams?: PaginationQuery
    private _filters?: GetToolsQueryFilters

    constructor(filters?: GetToolsQueryFilters) {
        this._filters = filters
        makeObservable<this, '_list' | '_filters' | '_meta' | '_setList' | '_setMeta' | '_paginationParams'>(this, {
            _list: observable,
            _filters: observable,
            _meta: observable,
            _paginationParams: observable,
            setFilters: action,
            filters: computed,
            meta: computed,
            list: computed,
            _setList: action,
            _setMeta: action,
            load: action
        })
    }

    public get filters() {
        return this._filters
    }

    public setFilters(filters: GetToolsQueryFilters) {
        this._list = null
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

export class ToolsList extends ToolsListBase implements LifeCycledModel {
    private _disposers: any[] = []

    constructor(filters?: GetToolsQueryFilters) {
        super(filters)
        this._disposers.push(
            reaction(() => super.filters, () => {
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
}
