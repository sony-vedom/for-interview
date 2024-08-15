import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { MedicalExamination } from 'entities/medical-examination/model'
import { Meta, Pagination, PaginationQuery } from 'shared/api'
import { LifeCycledModel } from 'shared/lib/mobx'
import * as medicalExaminationApi from '../../api'
import {
    GetMedicalExaminationQueryFilters
} from '../../api/query/get-medical-examination.query.ts'

export class MedicalExaminationListStore implements LifeCycledModel {
    private _meta: Meta = Meta.INITIAL
    private _list: Pagination<MedicalExamination[]> | null = null
    private _paginationParams?: PaginationQuery
    private _filters?: GetMedicalExaminationQueryFilters
    private _disposers: any[] = []

    constructor(filters?: GetMedicalExaminationQueryFilters) {
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

    public setFilters(filters: GetMedicalExaminationQueryFilters) {
        this._filters = filters
    }

    get meta() {
        return this._meta
    }

    get list() {
        return this._list
    }

    private _setMedicalExaminations(list: Pagination<MedicalExamination[]>) {
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
            const usersResponse = await medicalExaminationApi
                .getMedicalExaminations(this._paginationParams, this._filters)
            runInAction(() => {
                this._setMedicalExaminations(usersResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }
}
