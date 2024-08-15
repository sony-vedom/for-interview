import { makeAutoObservable, runInAction } from 'mobx'
import { Meta, Pagination, PaginationQuery } from 'shared/api'
import * as simpleEducationApi from '../../api'
import {
    GetSimpleEducationFilters
} from '../../api/query/get-types-simple-education.query'
import { SimpleEducation } from '../../model/types'

export class SimpleEducationListStore {
    private _meta: Meta = Meta.INITIAL
    private _list: Pagination<SimpleEducation[]> | null = null
    private _paginationParams?: PaginationQuery
    private _filters?: GetSimpleEducationFilters

    constructor(filters?: GetSimpleEducationFilters) {
        this._filters = filters
        makeAutoObservable(this, {})
    }

    get queryParams() {
        return [
            this._paginationParams,
            this._filters
        ]
    }

    public setFilters(filters: GetSimpleEducationFilters) {
        this._filters = filters
    }

    get meta() {
        return this._meta
    }

    get list() {
        return this._list
    }

    private _setList(list: Pagination<SimpleEducation[]>) {
        this._list = list
    }

    private _setMeta(meta: Meta) {
        this._meta = meta
    }

    public cleanList() {
        this._list = null
    }

    public async load(filters?: GetSimpleEducationFilters) {
        if (!this._list) {
            this._setMeta(Meta.LOADING)
        } else {
            this._setMeta(Meta.FETCHING)
        }
        try {
            const simpleEducations = await simpleEducationApi.getSimpleEducations(this._paginationParams, Object.values(filters ?? {}).length ? filters : this._filters)
            runInAction(() => {
                this._setList(simpleEducations)
                this._setMeta(Meta.SUCCESS)
            })
        } catch(e) {
            this._setMeta(Meta.ERROR)
        }
    }
}
