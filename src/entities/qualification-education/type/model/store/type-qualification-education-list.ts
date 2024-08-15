import { makeAutoObservable, runInAction } from 'mobx'
import { Meta, Pagination, PaginationQuery } from 'shared/api'
import * as typeQualificationEducationApi from '../../api'
import {
    GetTypeQualificationEducationFilters
} from '../../api/query/get-type-qualification-education.query.ts'
import { TypeQualificationEducation } from 'entities/qualification-education/type/model/types'

export class TypeQualificationEducationListStore {
    private _meta: Meta = Meta.INITIAL
    private _list: Pagination<TypeQualificationEducation[]> | null = null
    private _paginationParams?: PaginationQuery
    private _filters?: GetTypeQualificationEducationFilters

    constructor(filters?: GetTypeQualificationEducationFilters) {
        this._filters = filters
        makeAutoObservable(this, {})
    }

    get queryParams() {
        return [
            this._paginationParams,
            this._filters
        ]
    }

    public setFilters(filters: GetTypeQualificationEducationFilters) {
        this._filters = filters
    }

    get meta() {
        return this._meta
    }

    get list() {
        return this._list
    }

    private _setList(list: Pagination<TypeQualificationEducation[]>) {
        this._list = list
    }

    private _setMeta(meta: Meta) {
        this._meta = meta
    }

    public cleanList() {
        this._list = null
    }

    public async load(params?: PaginationQuery, filters?: GetTypeQualificationEducationFilters) {
        if (!this._list) {
            this._setMeta(Meta.LOADING)
        } else {
            this._setMeta(Meta.FETCHING)
        }
        try {
            const res = await typeQualificationEducationApi
                .getTypeQualificationEducations(
                    params ?? this._paginationParams,
                    Object.values(filters ?? {}).length ? filters : this._filters
                )
            runInAction(() => {
                this._setList(res)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }
}
