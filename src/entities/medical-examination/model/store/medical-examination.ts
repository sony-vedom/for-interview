import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import * as medicalExaminationApi from '../../api'
import {
    MedicalExamination,
    MedicalExaminationCreate, MedicalExaminationEdit,
    MedicalExaminationListStore
} from 'entities/medical-examination'

export class MedicalExaminationStore {
    private _meta: Meta = Meta.INITIAL
    private _medical_examination: MedicalExamination | null = null
    private _root?: MedicalExaminationListStore

    constructor({ id, root }: { id?: number, root?: MedicalExaminationListStore }) {
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

    get medical_examination() {
        return this._medical_examination
    }

    private _setMedicalExamination(position: MedicalExamination) {
        this._medical_examination = position
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
            const positionResponse = await medicalExaminationApi.getMedicalExamination({
                medical_examination_id: id
            })
            runInAction(() => {
                this._setMedicalExamination(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }

    public async create(body: MedicalExaminationCreate) {
        this._setMeta(Meta.SAVING)
        try {
            const positionResponse = await medicalExaminationApi.createMedicalExamination({
                ...body
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setMedicalExamination(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }

    public async edit(id: number, body: MedicalExaminationEdit) {
        this._setMeta(Meta.EDITING)
        try {
            const positionResponse = await medicalExaminationApi.editPosition({
                position_id: id,
                ...body
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setMedicalExamination(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }

    public async delete(id: number) {
        this._setMeta(Meta.DELETING)
        try {
            const positionResponse = await medicalExaminationApi.deleteMedicalExamination({
                medical_examination_id: id
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setMedicalExamination(positionResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this._setMeta(Meta.ERROR)
        }
    }
}
