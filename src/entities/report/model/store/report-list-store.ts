import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { Meta, Pagination, PaginationQuery } from 'shared/api'
import { LifeCycledModel } from 'shared/lib/mobx'
import {
    GetReportQueryFilters
} from '../../api/query/get-sbt-rejection-standards.query.ts'
import * as reportApi from '../../api'
import { Report } from 'entities/report'

export class ReportListStore implements LifeCycledModel {
    private _meta: Meta = Meta.INITIAL
    private _list: Pagination<Report[]> | null = null
    private _pagination?: PaginationQuery = {
        page_index: 0,
        page_size: 15
    }
    private _filters?: GetReportQueryFilters
    private _disposers: any[] = []

    constructor(filters?: GetReportQueryFilters) {
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

    public get pagination() {
        return this._pagination
    }

    public setPagination(pagination: PaginationQuery) {
        this._pagination = pagination
    }

    public destroy() {
        this._disposers.forEach(dispose => dispose())
        this._disposers = []
    }

    public setFilters(filters: GetReportQueryFilters) {
        this._filters = filters
    }

    get meta() {
        return this._meta
    }

    get list() {
        return this._list
    }

    private _setList(list: Pagination<Report[]>) {
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
            const res = await reportApi
                .getReportsList(this._pagination ? {
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
