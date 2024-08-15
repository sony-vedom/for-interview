import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import * as qualificationEducationApi from '../../api'
import { QualificationEducation, QualificationEducationCreate, QualificationEducationEdit } from '../types'
import { QualificationEducationListStore } from 'entities/qualification-education/item'

export class QualificationEducationStore {
    private _meta: Meta = Meta.INITIAL
    private _item: QualificationEducation | null = null
    private _root?: QualificationEducationListStore | null = null

    constructor({ id, root }: { id?: number,  root?: QualificationEducationListStore }) {
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

    get item() {
        return this._item
    }

    private _setMedicalExamination(simple_education: QualificationEducation) {
        this._item = simple_education
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
            const response = await qualificationEducationApi.getQualificationEducation({
                qualification_education_id: id
            })
            runInAction(() => {
                this._setMedicalExamination(response)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }

    public async create(body: QualificationEducationCreate) {
        this._setMeta(Meta.SAVING)
        try {
            const response = await qualificationEducationApi.createQualificationEducation({
                ...body
            })
            this._root?.load()
            runInAction(() => {
                this._setMedicalExamination(response)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }

    public async edit(id: number, body: QualificationEducationEdit) {
        this._setMeta(Meta.EDITING)
        try {
            const response = await qualificationEducationApi.editQualificationEducation({
                qualification_education_id: id,
                ...body
            })
            this._root?.load()

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
            const response = await qualificationEducationApi.deleteQualificationEducation({
                qualification_education_id: id
            })
            this._root?.load()
            runInAction(() => {
                this._setMedicalExamination(response)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }
}
