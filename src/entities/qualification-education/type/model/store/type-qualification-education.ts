import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import * as typeQualificationEducationApi from '../../api'
import { TypeQualificationEducation, TypeQualificationEducationCreate, TypeQualificationEducationEdit } from '../types'

export class TypeQualificationEducationStore {
    private _meta: Meta = Meta.INITIAL
    private _item: TypeQualificationEducation | null = null

    constructor({ id }: { id?: number }) {
        makeAutoObservable<this, '_root'>(this, {
            _root: false
        })
        if (id) {
            this.init(id)
        }
    }

    get meta() {
        return this._meta
    }

    get item() {
        return this._item
    }

    private _setItem(item: TypeQualificationEducation) {
        this._item = item
    }

    private _setMeta(meta: Meta) {
        this._meta = meta
    }

    public init(id: number) {
        this.load(id)
    }

    public async load(id: number) {
        this._setMeta(Meta.LOADING)
        try {
            const response = await typeQualificationEducationApi.getTypeQualificationEducation({
                type_qualification_education_id: id
            })
            runInAction(() => {
                this._setItem(response)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }

    public async create(body: TypeQualificationEducationCreate) {
        this._setMeta(Meta.SAVING)
        try {
            const response = await typeQualificationEducationApi.createTypeQualificationEducation({
                ...body
            })
            runInAction(() => {
                this._setItem(response)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }

    public async edit(id: number, body: TypeQualificationEducationEdit) {
        this._setMeta(Meta.EDITING)
        try {
            const response = await typeQualificationEducationApi.editTypeQualificationEducation({
                type_qualification_education_id: id,
                ...body
            })

            runInAction(() => {
                this._setItem(response)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }

    public async delete(id: number) {
        this._setMeta(Meta.DELETING)
        try {
            const response = await typeQualificationEducationApi.deleteTypeQualificationEducation({
                type_qualification_education_id: id
            })

            runInAction(() => {
                this._setItem(response)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }
}
