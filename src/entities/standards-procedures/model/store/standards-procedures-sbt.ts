import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import * as standardsProceduresSbtApi from '../../api'
import { StandardsProceduresSbtListStore } from './standards-procedures-sbt-list.ts'
import { StandardsProceduresSbt, StandardsProceduresSbtCreate, StandardsProceduresSbtEdit } from '../types'

export class StandardsProceduresSbtStore {
    private _meta: Meta = Meta.INITIAL
    private _elem: StandardsProceduresSbt | null = null
    private _root?: StandardsProceduresSbtListStore

    constructor({ id, root }: { id?: number | null, root?: StandardsProceduresSbtListStore }) {
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

    private _setElem(position: StandardsProceduresSbt) {
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
            const positionResponse = await standardsProceduresSbtApi.getStandardsProcedureSbt({
                standard_procedures_sbt_query: id
            })
            runInAction(() => {
                this._setElem(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }

    public async create(body: StandardsProceduresSbtCreate) {
        this._setMeta(Meta.SAVING)
        try {
            const positionResponse = await standardsProceduresSbtApi.createStandardsProcedureSbt({
                ...body
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setElem(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }

    public async edit(id: number, body: StandardsProceduresSbtEdit) {
        this._setMeta(Meta.EDITING)
        try {
            const positionResponse = await standardsProceduresSbtApi.editStandardsProcedureSbt({
                standard_procedures_sbt_query: id,
                ...body
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setElem(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }

    public async delete(id: number) {
        this._setMeta(Meta.DELETING)
        try {
            const positionResponse = await standardsProceduresSbtApi.deleteStandardsProcedureSbt({
                standard_procedures_sbt_query: id
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setElem(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }
}
