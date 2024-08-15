import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import {
    SbtRejectionStandards,
    SbtRejectionStandardsCreate, SbtRejectionStandardsEdit,
    SbtRejectionStandardsListStore
} from 'entities/sbt-rejection-standards/item'
import * as sbtRejectionStandards from '../../api'

export class SbtRejectionStandardsStore {
    private _meta: Meta = Meta.INITIAL
    private _elem: SbtRejectionStandards | null = null
    private _root?: SbtRejectionStandardsListStore

    constructor({ id, root }: { id?: number, root?: SbtRejectionStandardsListStore }) {
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

    private _setElem(elem: SbtRejectionStandards) {
        this._elem = elem
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
            const positionResponse = await sbtRejectionStandards.getSbtRejectionStandards({
                sbt_rejection_standards_id: id
            })
            runInAction(() => {
                this._setElem(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }

    public async create(body: SbtRejectionStandardsCreate) {
        this._setMeta(Meta.SAVING)
        try {
            const positionResponse = await sbtRejectionStandards.createSbtRejectionStandards({
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

    public async edit(id: number, body: SbtRejectionStandardsEdit) {
        this._setMeta(Meta.EDITING)
        try {
            const positionResponse = await sbtRejectionStandards.editSbtRejectionStandards({
                sbt_rejection_standards_id: id,
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
            const positionResponse = await sbtRejectionStandards.deleteSbtRejectionStandards({
                sbt_rejection_standards_id: id
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
