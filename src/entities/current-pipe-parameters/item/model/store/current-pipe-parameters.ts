import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import * as currentPipeParameters from '../../api'
import {
    CurrentPipeParametersList
} from 'entities/current-pipe-parameters/item/model/store/current-pipe-parameters-list.ts'
import { ICurrentSbtParams } from 'entities/current-pipe-parameters/item/model/sbt-current-param.ts'
import { ICreateCurrentSbtParams } from 'entities/current-pipe-parameters/item/model/create-sbt-current-param.ts'
import { IEditCurrentSbtParams } from 'entities/current-pipe-parameters/item/model/edit-sbt-current-param.ts'

export class CurrentPipeParameters {
    private _meta: Meta = Meta.INITIAL
    private _elem: ICurrentSbtParams | null = null
    private _root?: CurrentPipeParametersList

    constructor({ id, root }: { id?: number, root?: CurrentPipeParametersList }) {
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

    private _setElem(elem: ICurrentSbtParams) {
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
            const positionResponse = await currentPipeParameters.getCurrentParam({
                current_params_id: id
            })
            runInAction(() => {
                this._setElem(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }

    public async loadById(serial_number: string) {
        this._setMeta(Meta.LOADING)
        try {
            const positionResponse = await currentPipeParameters.getCurrentParamBySerialNumber({
                serial_number
            })
            runInAction(() => {
                this._setElem(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }

    public async create(body: ICreateCurrentSbtParams) {
        this._setMeta(Meta.SAVING)
        try {
            const positionResponse = await currentPipeParameters.createCurrentParam({
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

    public async edit(id: number, body: IEditCurrentSbtParams) {
        this._setMeta(Meta.EDITING)
        try {
            const positionResponse = await currentPipeParameters.editCurrentParam({
                current_params_id: id,
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
            const positionResponse = await currentPipeParameters.deleteCurrentParam({
                current_params_id: id
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
