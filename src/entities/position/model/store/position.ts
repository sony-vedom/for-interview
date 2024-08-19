import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import { Position, PositionCreate, PositionEdit } from 'entities/position/model/types'
import { PositionListStore } from 'entities/position/model/store/position-list.ts'
import * as positionApi from '../../api'
import { useMobXLocalStore } from 'shared/lib/mobx'

export class PositionStore {
    private _meta: Meta = Meta.INITIAL
    private _position: Position | null = null
    private _root?: PositionListStore

    constructor({ id, root }: { id?: number | null, root?: PositionListStore }) {
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

    get position() {
        return this._position
    }

    private _setPosition(position: Position) {
        this._position = position
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
            const positionResponse = await positionApi.getPosition({
                position_id: id
            })
            runInAction(() => {
                this._setPosition(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }

    public async create(body: PositionCreate) {
        this._setMeta(Meta.SAVING)
        try {
            const positionResponse = await positionApi.createPosition({
                ...body
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setPosition(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }

    public async edit(id: number, body: PositionEdit) {
        this._setMeta(Meta.EDITING)
        try {
            const positionResponse = await positionApi.editPosition({
                position_id: id,
                ...body
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setPosition(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }

    public async delete(id: number) {
        this._setMeta(Meta.DELETING)
        try {
            const positionResponse = await positionApi.deletePosition({
                position_id: id
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setPosition(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }
}

export const usePosition = (positionId?: number | string) => {
    return useMobXLocalStore(() => new PositionStore({id: Number(positionId)}))
}