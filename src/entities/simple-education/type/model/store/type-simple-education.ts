import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import * as typeSimpleEducationApi from '../../api'
import { TypeSimpleEducationListStore } from './type-simple-education-list.ts'
import {
    TypesSimpleEducation,
    TypesSimpleEducationCreate,
    TypesSimpleEducationEdit
} from 'entities/simple-education/type/model/types'


export class TypeSimpleEducationStore {
    private _meta: Meta = Meta.INITIAL
    private _type_simple_education: TypesSimpleEducation | null = null
    private _root?: TypeSimpleEducationListStore

    constructor({ id, root }: { id?: number, root?: TypeSimpleEducationListStore }) {
        this._root = root
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

    get type_simple_education() {
        return this._type_simple_education
    }

    private _setElem(el: TypesSimpleEducation) {
        this._type_simple_education = el
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
            const response = await typeSimpleEducationApi.getTypesSimpleEducation({
                types_simple_education_id: id
            })
            runInAction(() => {
                this._setElem(response)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }

    public async create(body: TypesSimpleEducationCreate) {
        this._setMeta(Meta.SAVING)
        try {
            const response = await typeSimpleEducationApi.createTypesSimpleEducation({
                ...body
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

    public async edit(id: number, body: TypesSimpleEducationEdit) {
        this._setMeta(Meta.EDITING)
        try {
            const response = await typeSimpleEducationApi.editTypesSimpleEducation({
                types_simple_education_id: id,
                ...body
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
            const response = await typeSimpleEducationApi.deleteTypesSimpleEducation({
                types_simple_education_id: id
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
