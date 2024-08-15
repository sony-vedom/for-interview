import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import { LifeCycledModel } from 'shared/lib/mobx'
import * as typeSimpleEducationApi from '../../api'
import { TypesSimpleEducation } from '../types'

export class TypeSimpleEducationListStore implements LifeCycledModel {
    private _meta: Meta = Meta.INITIAL
    private _list: TypesSimpleEducation[] | null = null
    private _disposers: any[] = []

    constructor() {
        makeAutoObservable(this, {})
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

    private _setList(list: TypesSimpleEducation[]) {
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
            const simpleEducations = await typeSimpleEducationApi
                .getTypesSimpleEducations()
            runInAction(() => {
                this._setList(simpleEducations)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }
}
