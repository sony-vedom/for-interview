import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { Meta, Pagination, PaginationQuery } from 'shared/api'
import { LifeCycledModel } from 'shared/lib/mobx'
import {
    GetSbtRejectionStandardsQueryFilters
} from '../../api/query/get-sbt-rejection-standards.query.ts'
import { SbtRejectionStandards } from '../../model'
import * as sbtRejectionStandards from '../../api'

export class SbtRejectionStandardsListStore implements LifeCycledModel {
    private _meta: Meta = Meta.INITIAL
    private _list: Pagination<SbtRejectionStandards[]> | null = null
    private _paginationParams?: PaginationQuery
    private _filters?: GetSbtRejectionStandardsQueryFilters
    private _disposers: any[] = []

    constructor(filters?: GetSbtRejectionStandardsQueryFilters) {
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

    public setFilters(filters: GetSbtRejectionStandardsQueryFilters) {
        this._filters = filters
    }

    get meta() {
        return this._meta
    }

    get list() {
        return this._list
    }

    private _setMedicalExaminations(list: Pagination<SbtRejectionStandards[]>) {
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
            const res = await sbtRejectionStandards
                .getSbtRejectionStandardsList(this._paginationParams, this._filters)
            runInAction(() => {
                this._setMedicalExaminations(res)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }
}
