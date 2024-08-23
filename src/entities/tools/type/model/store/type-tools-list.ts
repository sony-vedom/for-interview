import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import { LifeCycledModel } from 'shared/lib/mobx'
import * as kindToolsApi from '../../api'
import { TypeTools } from 'entities/tools/type/model/types'
import { GetTypeToolsQueryFilters } from '../../api/query/get-type-tools.query.ts'

export class TypeToolsListBase {
    private _meta: Meta = Meta.INITIAL
    private _list: TypeTools[] | null = null
    private _filters?: GetTypeToolsQueryFilters

    constructor(filters?: GetTypeToolsQueryFilters) {
        this._filters = filters
        makeObservable<this, '_list' | '_filters' | '_meta' | '_setList' | '_setMeta'>(this, {
            _list: observable,
            _filters: observable,
            _meta: observable,
            setFilters: action,
            filters: computed,
            meta: computed,
            list: computed,
            _setList: action,
            _setMeta: action,
            load: action
        })
    }

    public setFilters(filters: GetTypeToolsQueryFilters) {
        this._list = null
        this._filters = filters
    }

    public get filters() {
        return this._filters
    }

    get meta() {
        return this._meta
    }

    get list() {
        return this._list
    }

    private _setList(list: TypeTools[]) {
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
            const res = await kindToolsApi
                .getTypeToolsList(this._filters)
            runInAction(() => {
                this._setList(res)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }
}

export class TypeToolsList extends TypeToolsListBase implements LifeCycledModel {
    private _disposers: any[] = []

    constructor(filters?: GetTypeToolsQueryFilters) {
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
