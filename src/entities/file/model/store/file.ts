import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import * as fileApi from '../../api'
import { FileListStore } from 'entities/file/model/store/file-list.ts'
import { BASE_FILE_URLS } from 'entities/file/model'
import { CreateFileQuery } from 'entities/file/api/query/get-file.query.ts'

export class FileStore {
    private _meta: Meta = Meta.INITIAL
    private _elem: Blob | null = null
    private _root?: FileListStore
    private readonly _base_url: BASE_FILE_URLS

    constructor(base_url: BASE_FILE_URLS, id?: number, root?: FileListStore) {
        this._root = root
        this._base_url = base_url
        makeAutoObservable<this, '_root'>(this, {
            _root: false
        })
        if (id) {
            this.init(id)
        }
    }

    public get baseUrl() {
        return this._base_url
    }

    get meta() {
        return this._meta
    }

    get elem() {
        return this._elem
    }

    private _setElem(elem: Blob | null) {
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
            const res = await fileApi.getFile(this._base_url, {
                id
            })
            runInAction(() => {
                this._setElem(res)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }

    public async create(params: CreateFileQuery, body: FormData) {
        this._setMeta(Meta.SAVING)
        try {
            const createRes = await fileApi.createFile(this._base_url, {
                id: params.id
            }, body)
            const file = await fileApi.getFile(this._base_url, {
                id: createRes.id
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setElem(file)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }

    public async delete(id: number) {
        this._setMeta(Meta.DELETING)
        try {
            const res = await fileApi.deleteFile(this._base_url, {
                id
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setElem(res)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }
}
