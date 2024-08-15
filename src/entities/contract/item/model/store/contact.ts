import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import { ContractListStore } from './contract-list.ts'
import { Contract, ContractCreate, ContractEdit } from 'entities/contract/item'
import * as contractApi from '../../api'

export class ContractStore {
    private _meta: Meta = Meta.INITIAL
    private _elem: Contract | null = null
    private _root?: ContractListStore

    constructor({ id, root }: { id?: number, root?: ContractListStore }) {
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

    private _setElem(elem: Contract) {
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
            const positionResponse = await contractApi.getContract({
                contract_id: id
            })
            runInAction(() => {
                this._setElem(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }

    public async create(body: ContractCreate) {
        this._setMeta(Meta.SAVING)
        try {
            const positionResponse = await contractApi.createContract({
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

    public async edit(id: number, body: ContractEdit) {
        this._setMeta(Meta.EDITING)
        try {
            const positionResponse = await contractApi.editContract({
                contract_id: id,
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
            const positionResponse = await contractApi.deleteContract({
                contract_id: id
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
