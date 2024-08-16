import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import * as pipeParameterApi from '../../api'
import { PipeParameterList } from './pipe-parameter-list.ts'
import { PipeParameter } from '../types'

export class KindToolStore {
    private _meta: Meta = Meta.INITIAL
    private _elem: PipeParameter | null = null
    // private _root?: PipeParameterList

    constructor({ id }: { id?: number | null, root?: PipeParameterList }) {
        // this._root = root
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

    private _setElem(position: PipeParameter) {
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
            const res = await pipeParameterApi.getPipeParameter({
                parameter_id: id
            })
            runInAction(() => {
                this._setElem(res)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }
}
