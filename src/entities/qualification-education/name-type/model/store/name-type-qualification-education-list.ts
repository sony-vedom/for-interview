import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import * as nameTypeQualificationEducationApi from '../../api'
import {
    GetNameTypeQualificationEducationFilters
} from '../../api/query/get-name-type-qualification-education.query.ts'
import { NameTypeQualificationEducation } from '../types'
import { LifeCycledModel } from 'shared/lib/mobx'

export class NameTypeQualificationEducationListStore implements LifeCycledModel {
    private _meta: Meta = Meta.INITIAL
    private _list: NameTypeQualificationEducation[] | null = null
    private _filters?: GetNameTypeQualificationEducationFilters
    private _disposers: any[] = []

    constructor(filters?: GetNameTypeQualificationEducationFilters) {
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

    private _setList(list: NameTypeQualificationEducation[]) {
        this._list = list
    }

    private _setMeta(meta: Meta) {
        this._meta = meta
    }

    public async load(filters?: GetNameTypeQualificationEducationFilters) {
        if (!this._list) {
            this._setMeta(Meta.LOADING)
        } else {
            this._setMeta(Meta.FETCHING)
        }
        try {
            const res = await nameTypeQualificationEducationApi.getNameTypeQualificationEducations(
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
