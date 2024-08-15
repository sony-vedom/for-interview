import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import { LifeCycledModel } from 'shared/lib/mobx'
import { QualificationEducation } from '../types'
import {
    GetQualificationEducationFilters
} from '../../api/query/get-qualification-education.query.ts'
import * as qualificationEducationApi from '../../api'

export class QualificationEducationListStore implements LifeCycledModel {
    private _meta: Meta = Meta.INITIAL
    private _list: QualificationEducation[] | null = null
    private _filters?: GetQualificationEducationFilters
    private _disposers: any[] = []

    constructor(filters?: GetQualificationEducationFilters) {
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

    get meta() {
        return this._meta
    }

    get list() {
        return this._list
    }

    private _setList(list: QualificationEducation[]) {
        this._list = list
    }

    private _setMeta(meta: Meta) {
        this._meta = meta
    }

    public async load(filters?: GetQualificationEducationFilters) {
        if (!this._list) {
            this._setMeta(Meta.LOADING)
        } else {
            this._setMeta(Meta.FETCHING)
        }
        try {
            const res = await qualificationEducationApi.getQualificationEducations(
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
