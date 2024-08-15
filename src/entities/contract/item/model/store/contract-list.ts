import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import { LifeCycledModel } from 'shared/lib/mobx'
import { GetContractQueryFilters } from '../../api/query/get-contract.query.ts'
import { Contract } from 'entities/contract/item'
import * as contractApi from '../../api'

export class ContractListStore implements LifeCycledModel {
    private _meta: Meta = Meta.INITIAL
    private _list: Contract[] | null = null
    private _filters?: GetContractQueryFilters
    private _disposers: any[] = []

    constructor(filters?: GetContractQueryFilters) {
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

    public setFilters(filters: GetContractQueryFilters) {
        this._filters = filters
    }

    get meta() {
        return this._meta
    }

    get list() {
        return this._list
    }

    private _setMedicalExaminations(list: Contract[]) {
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
            const usersResponse = await contractApi
                .getContracts(this._filters)
            runInAction(() => {
                this._setMedicalExaminations(usersResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }
}
