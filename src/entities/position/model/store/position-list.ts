import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import { Position } from 'entities/position/model/types'
import * as positionApi from "../../api"

export class PositionListStore {
    private _meta: Meta = Meta.INITIAL
    private _list: Position[] | null = null

    constructor() {
        makeAutoObservable(this, {})
        this.init()
    }

    get meta() {
        return this._meta
    }

    get list() {
        return this._list
    }

    private _setUsers(list: Position[]) {
        this._list = list
    }

    private _setMeta(meta: Meta) {
        this._meta = meta
    }

    public init() {
        this.load()
    }

    public async load() {
        if (!this._list) {
            this._setMeta(Meta.LOADING)
        } else {
            this._setMeta(Meta.FETCHING)
        }
        try {
            const usersResponse = await positionApi.getPositions()
            runInAction(() => {
                this._setUsers(usersResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }
}
