import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import * as simpleEducationApi from '../../api'
import { SimpleEducation, SimpleEducationCreate, SimpleEducationEdit } from '../../model/types'

export class SimpleEducationStore {
    private _meta: Meta = Meta.INITIAL
    private _medical_examination: SimpleEducation | null = null

    constructor({ id }: { id?: number }) {
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

    get medical_examination() {
        return this._medical_examination
    }

    private _setMedicalExamination(simple_education: SimpleEducation) {
        this._medical_examination = simple_education
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
            const response = await simpleEducationApi.getSimpleEducation({
                simple_education_id: id
            })
            runInAction(() => {
                this._setMedicalExamination(response)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }

    public async create(body: SimpleEducationCreate) {
        this._setMeta(Meta.SAVING)
        try {
            const response = await simpleEducationApi.createSimpleEducation({
                ...body
            })
            runInAction(() => {
                this._setMedicalExamination(response)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }

    public async edit(id: number, body: SimpleEducationEdit) {
        this._setMeta(Meta.EDITING)
        try {
            const response = await simpleEducationApi.editSimpleEducation({
                simple_education_id: id,
                ...body
            })

            runInAction(() => {
                this._setMedicalExamination(response)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }

    public async delete(id: number) {
        this._setMeta(Meta.DELETING)
        try {
            const response = await simpleEducationApi.deleteSimpleEducation({
                simple_education_id: id
            })

            runInAction(() => {
                this._setMedicalExamination(response)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }
}
