import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { Meta, Pagination, PaginationQuery } from 'shared/api'
import { LifeCycledModel } from 'shared/lib/mobx'
import * as consumerApi from '../../api'
import { GetConsumerQueryFilters } from 'entities/consumer/item/api/query/get-consumer.query.ts'
import { Consumer } from '../types'

export class ConsumerListStore implements LifeCycledModel {
    private _meta: Meta = Meta.INITIAL
    private _list: Pagination<Consumer[]> | null = null
    private _filters?: GetConsumerQueryFilters
    private _paginationParams?: PaginationQuery = {
        page_index: 0,
        page_size: 15
    }
    private _disposers: any[] = []

    constructor(filters?: GetConsumerQueryFilters) {
        this._filters = filters
        makeAutoObservable(this, {})
        this._disposers.push(
            reaction(() => this._filters, () => {
                this.load()
            })
        )
        this._disposers.push(
            reaction(() => this._paginationParams, () => {
                this.load()
            })
        )
    }

    get queryParams() {
        return [
            this._filters
        ]
    }

    get pagination() {
        return this._paginationParams
    }

    setPagination(pagination: PaginationQuery) {
        this._paginationParams = pagination
    }

    public init() {
        this.load()
    }

    public destroy() {
        this._disposers.forEach(dispose => dispose())
        this._disposers = []
    }

    public setFilters(filters: GetConsumerQueryFilters) {
        this._filters = filters
    }

    get meta() {
        return this._meta
    }

    get list() {
        return this._list
    }

    private _setMedicalExaminations(list: Pagination<Consumer[]>) {
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
            const res = await consumerApi
                .getConsumers(this._paginationParams ? {
                    page_index: this._paginationParams.page_index + 1,
                    page_size: this._paginationParams.page_size
                } : undefined, this._filters)
            runInAction(() => {
                this._setMedicalExaminations(res)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }
}
