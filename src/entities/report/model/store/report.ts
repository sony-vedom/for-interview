import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import {
    Report, ReportEdit, ReportCreate
} from '../types'
import { ReportListStore } from 'entities/report/model/store/report-list-store.ts'
import * as reportApi from '../../api'
import { toolsApi } from 'entities/tools/item'

export class ReportStore {
    private _meta: Meta = Meta.INITIAL
    private _elem: Report | null = null
    private _root?: ReportListStore

    constructor({ id, root }: { id?: number, root?: ReportListStore }) {
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

    private _setElem(elem: Report) {
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
            const positionResponse = await reportApi.getReport({
                report_id: id
            })
            runInAction(() => {
                this._setElem(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }

    public async create(body: ReportCreate) {
        this._setMeta(Meta.SAVING)
        try {
            const positionResponse = await reportApi.createReport({
                ...body
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setElem(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
            return positionResponse
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }

    public async edit(id: number, body: ReportEdit) {
        this._setMeta(Meta.EDITING)
        try {
            const positionResponse = await reportApi.editReport({
                report_id: id,
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
            const toolsList = await toolsApi.getToolsList({page_index: 1, page_size: 100}, [
                { key: "sbt_report_id", value: id}
            ])
            await Promise.all(await Promise.all(toolsList.items.map(async (el) => {
                await toolsApi.lockOrUnlockTools({
                    tools_id: el.id,
                    in_active_report: false,
                    sbt_report_id: null
                })
                return
            })))
            const res = await reportApi.deleteReport({
                report_id: id
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
