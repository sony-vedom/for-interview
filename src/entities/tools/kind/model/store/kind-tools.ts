import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import * as kindToolsApi from '../../api'
import { KindToolsList } from './kind-tools-list.ts'
import { KindTools, KindToolsCreate, KindToolsEdit } from '../types'

export class KindToolStore {
    private _meta: Meta = Meta.INITIAL
    private _elem: KindTools | null = null
    private _root?: KindToolsList

    constructor({ id, root }: { id?: number | null, root?: KindToolsList }) {
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

    private _setMedicalExamination(position: KindTools) {
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
            const positionResponse = await kindToolsApi.getKindTools({
                kind_tools_id: id
            })
            runInAction(() => {
                this._setMedicalExamination(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }

    public async create(body: KindToolsCreate) {
        this._setMeta(Meta.SAVING)
        try {
            const positionResponse = await kindToolsApi.createKindTools({
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

    public async edit(id: number, body: KindToolsEdit) {
        this._setMeta(Meta.EDITING)
        try {
            const positionResponse = await kindToolsApi.editKindTools({
                kind_tools_id: id,
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
            const positionResponse = await kindToolsApi.deleteKindTools({
                kind_tools_id: id
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
