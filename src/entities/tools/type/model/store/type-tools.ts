import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import * as typeToolsApi from '../../api'
import { TypeToolsList } from './type-tools-list.ts'
import { TypeTools, TypeToolsCreate, TypeToolsEdit } from 'entities/tools/type/model/types'

export class TypeToolStore {
    private _meta: Meta = Meta.INITIAL
    private _elem: TypeTools | null = null
    private _root?: TypeToolsList

    constructor({ id, root }: { id?: number | null, root?: TypeToolsList }) {
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

    get elem() {
        return this._elem
    }

    private _setMedicalExamination(position: TypeTools) {
        this._elem = position
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
            const positionResponse = await typeToolsApi.getTypeTools({
                type_tools_id: id
            })
            runInAction(() => {
                this._setMedicalExamination(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }

    public async create(body: TypeToolsCreate) {
        this._setMeta(Meta.SAVING)
        try {
            const positionResponse = await typeToolsApi.createTypeTools({
                ...body
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setMedicalExamination(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }

    public async edit(id: number, body: TypeToolsEdit) {
        this._setMeta(Meta.EDITING)
        try {
            const positionResponse = await typeToolsApi.editTypeTools({
                type_tools_id: id,
                ...body
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setMedicalExamination(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }

    public async delete(id: number) {
        this._setMeta(Meta.DELETING)
        try {
            const positionResponse = await typeToolsApi.deleteTypeTools({
                type_tools_id: id
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setMedicalExamination(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }
}
