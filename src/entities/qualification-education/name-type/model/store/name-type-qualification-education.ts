import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import {
    NameTypeQualificationEducation,
    NameTypeQualificationEducationCreate,
    NameTypeQualificationEducationEdit
} from '../types'
import {
    NameTypeQualificationEducationListStore
} from 'entities/qualification-education/name-type/model/store/name-type-qualification-education-list.ts'
import * as nameTypeSimpleEducationApi from '../../api'
import { getQualificationEducationUrlParams } from 'entities/qualification-education/item'
import { KIND_QUALIFICATION_EDUCATION } from 'entities/qualification-education/kind'

export class NameTypeQualificationEducationStore {
    private _meta: Meta = Meta.INITIAL
    private _item: NameTypeQualificationEducation | null = null
    private _root?: NameTypeQualificationEducationListStore
    private _kindEducation?: KIND_QUALIFICATION_EDUCATION

    constructor({ id, root, kindEducation }: {
        id?: number,
        root?: NameTypeQualificationEducationListStore,
        kindEducation?: KIND_QUALIFICATION_EDUCATION
    }) {
        this._root = root
        this._kindEducation = kindEducation
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

    get name_type_simple_education() {
        return this._item
    }

    private _setElem(el: NameTypeQualificationEducation) {
        this._item = el
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
            const response = await nameTypeSimpleEducationApi.getNameTypeQualificationEducation({
                name_type_qualification_education_id: id
            })
            runInAction(() => {
                this._setElem(response)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }

    public async create(body: NameTypeQualificationEducationCreate) {
        this._setMeta(Meta.SAVING)
        try {
            const response = await nameTypeSimpleEducationApi.createTypeQualificationEducation({
                ...body,
                kind_education: getQualificationEducationUrlParams()
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setElem(response)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }

    public async edit(id: number, body: NameTypeQualificationEducationEdit) {
        this._setMeta(Meta.EDITING)
        try {
            const response = await nameTypeSimpleEducationApi.editNameTypeQualificationEducation({
                name_type_qualification_education_id: id,
                ...body,
                kind_education: this._kindEducation ?? KIND_QUALIFICATION_EDUCATION.SDANK
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setElem(response)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }

    public async delete(id: number) {
        this._setMeta(Meta.DELETING)
        try {
            const response = await nameTypeSimpleEducationApi.deleteNameTypeQualificationEducation({
                name_type_qualification_education_id: id
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setElem(response)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }
}
