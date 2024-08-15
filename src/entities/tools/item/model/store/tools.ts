import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import * as toolsApi from '../../api'
import { Tool, ToolsCreate, ToolsEdit } from '../types'
import { ToolsList } from './tools-list.ts'

export class ToolStore {
    private _meta: Meta = Meta.INITIAL
    private _elem: Tool | null = null
    private _root?: ToolsList

    constructor({ id, root }: { id?: number, root?: ToolsList }) {
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

    private _setMedicalExamination(position: Tool) {
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
            const positionResponse = await toolsApi.getTools({
                tools_id: id
            })
            runInAction(() => {
                this._setMedicalExamination(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }

    public async create(body: ToolsCreate) {
        this._setMeta(Meta.SAVING)
        try {
            const positionResponse = await toolsApi.createTools({
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

    public async edit(id: number, body: ToolsEdit) {
        this._setMeta(Meta.EDITING)
        try {
            const positionResponse = await toolsApi.editTools({
                tools_id: id,
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
            const positionResponse = await toolsApi.deleteTools({
                tools_id: id
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
