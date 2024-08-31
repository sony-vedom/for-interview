import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import { LifeCycledModel } from 'shared/lib/mobx'
import { AppFile, BASE_FILE_URLS } from 'entities/file/model'
import { GetFileQueryFilters } from 'entities/file/api/query/get-file.query.ts'
import * as fileApi from '../../api'
import { getFileName } from 'entities/file'

export class FileListStoreBase {
    private _meta: Meta = Meta.INITIAL
    private _list: AppFile[] | null = null
    private _filters?: GetFileQueryFilters
    private readonly _base_url: BASE_FILE_URLS
    private _fileList: FileList | null = null

    constructor(base_url: BASE_FILE_URLS, filters?: GetFileQueryFilters) {
        this._filters = filters
        this._base_url = base_url
        makeObservable<this, '_list' | '_filters' | '_meta' | '_setList' | '_setMeta' | '_base_url' | '_fileList'>(this, {
            _list: observable,
            _filters: observable,
            _meta: observable,
            _base_url: observable,
            setFilters: action,
            filters: computed,
            meta: computed,
            list: computed,
            _setList: action,
            _setMeta: action,
            load: action,
            baseUrl: computed,
            loadFilesList: action,
            _fileList: observable,
            fileList: computed
        })
    }

    public get filters() {
        return this._filters
    }

    public get baseUrl() {
        return this._base_url
    }

    public get fileList() {
        return this._fileList
    }


    public setFilters(filters: GetFileQueryFilters) {
        this._filters = filters
    }

    get meta() {
        return this._meta
    }

    get list() {
        return this._list
    }

    private _setList(list: AppFile[]) {
        this._list = list
    }

    private _setMeta(meta: Meta) {
        this._meta = meta
    }

    public async load() {
        if (!this._list) {
            this._setMeta(Meta.LOADING)
        } else {
            this._setMeta(Meta.FETCHING)
        }
        try {
            const res = await fileApi.getAllFiles(this._base_url, this._filters)
            runInAction(() => {
                this._setList(res)
                this._setMeta(Meta.SUCCESS)
            })
            return res
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }

    public async loadFilesList() {
        if (!this._fileList) {
            this._setMeta(Meta.LOADING)
        } else {
            this._setMeta(Meta.FETCHING)
        }
        try {
            const files = this._list ? this._list : await this.load()
            if (!files) {
                runInAction(() => {
                    this._fileList = null
                    this._setMeta(Meta.SUCCESS)
                })
            }
            let list = new DataTransfer()
            const filesList = await Promise.all(files!.map(async ({ id }) => {
                const res = await fileApi.getFileAxiosResponse(this._base_url, {
                    id
                })
                const type = res.headers['content-type'] as string
                const blob = new Blob([res.data], { type })
                return new File([blob], `${getFileName(res.headers['content-disposition'])}#${id}` || `file_${id}#${id}`, {
                    type
                })

            }))
            filesList.forEach((item) => {
                list.items.add(item)
            })
            runInAction(() => {
                this._fileList = list.files
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }
}


export class FileListStore extends FileListStoreBase implements LifeCycledModel {
    private _disposers: any[] = []

    constructor(base_url: BASE_FILE_URLS, filters?: GetFileQueryFilters) {
        super(base_url, filters)
        this._disposers.push(
            reaction(() => super.filters, () => {
                this.load()
            })
        )
        this._disposers.push(
            reaction(() => super.filters, () => {
                this.load()
            })
        )
        this._disposers.push(
            reaction(() => super.list, () => {
                this.loadFilesList()
            })
        )
    }

    public init() {
        this.load()
    }

    public destroy() {
        this._disposers.forEach(dispose => dispose())
        this._disposers = []
    }
}