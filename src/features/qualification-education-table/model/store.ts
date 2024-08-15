import { Meta } from 'shared/api'
import { flow, makeAutoObservable, reaction, runInAction } from 'mobx'
import {
    getQualificationEducationUrlParams,
    QualificationEducationListStore,
    QualificationEducationStore
} from 'entities/qualification-education/item'
import {
    TypeQualificationEducation,
    TypeQualificationEducationCreate,
    TypeQualificationEducationEdit,
    TypeQualificationEducationListStore,
    TypeQualificationEducationStore
} from 'entities/qualification-education/type'
import {
    NameTypeQualificationEducationListStore,
    NameTypeQualificationEducationStore
} from 'entities/qualification-education/name-type'

export type QualificationEducationTableItemType = {
    type_id: number,
    type_name: string
} & TypeQualificationEducation


export class QualificationEducationTableStore {
    private _qualificationEducationStore: QualificationEducationStore
    private _qualificationEducationListStore: QualificationEducationListStore

    private _typeQualificationEducation: TypeQualificationEducationStore
    private _typesQualificationEducationListStore: TypeQualificationEducationListStore

    private _nameTypeQualificationEducationListStore: NameTypeQualificationEducationListStore

    private _list?: QualificationEducationTableItemType[] | null = null
    private _disposers: any[] = []
    private _meta: Meta = Meta.INITIAL
    private _userId: number | null = null


    constructor(props: {
        qualificationEducationStore: QualificationEducationStore,
        qualificationEducationListStore: QualificationEducationListStore,
        typeQualificationEducation: TypeQualificationEducationStore,
        typesQualificationEducationListStore: TypeQualificationEducationListStore,
        nameTypeQualificationEducation: NameTypeQualificationEducationStore,
        nameTypeQualificationEducationListStore: NameTypeQualificationEducationListStore,

        userId: number
    }) {
        this._qualificationEducationListStore = props.qualificationEducationListStore
        this._qualificationEducationStore = props.qualificationEducationStore

        this._typeQualificationEducation = props.typeQualificationEducation
        this._typesQualificationEducationListStore = props.typesQualificationEducationListStore

        this._nameTypeQualificationEducationListStore = props.nameTypeQualificationEducationListStore

        this._userId = props.userId
        makeAutoObservable(this)

        this._disposers.push(
            reaction(() => this.isHasQualificationEducation, () => {
                this.loadTableList()
            })
        )
        this._disposers.push(
            reaction(() => this._nameTypeQualificationEducationListStore.list, () => {
                this.loadTableList()
            })
        )
    }

    get isHasQualificationEducation() {
        if (this._qualificationEducationListStore?.list?.[0]?.id === undefined) {
            return undefined
        }
        return !!this._qualificationEducationListStore?.list?.[0]?.id
    }

    get list() {
        return this._list
    }

    get meta() {
        return this._meta
    }

    init() {
        this.loadTableList()
    }

    destroy() {
        this._disposers.forEach(dispose => dispose())
    }

    private _setMeta(meta: Meta) {
        this._meta = meta
    }

    public async createQualification() {
        if (this._userId) {
            await this._qualificationEducationStore.create({
                user_id: this._userId,
                kind_education: getQualificationEducationUrlParams()
            })
            await this.loadTableList()
        }
    }

    public async deleteQualification() {
        await this._qualificationEducationStore.delete(this._qualificationEducationListStore?.list?.[0]?.id!)
        await this.loadTableList()
    }

    get educationId() {
        return this._qualificationEducationListStore?.list?.[0]?.id!
    }

    public async create(args: TypeQualificationEducationCreate) {
        await this._typeQualificationEducation.create(args)
        await this.loadTableList()
    }

    public async delete(id: number) {
        await this._typeQualificationEducation.delete(id)
        await this.loadTableList()
    }

    public async edit(id: number, args: TypeQualificationEducationEdit) {
        await this._typeQualificationEducation.edit(id, args)
        await this.loadTableList()
    }

    loadTableList = flow(function* (this: QualificationEducationTableStore) {
        if (!this._list) {
            this._setMeta(Meta.LOADING)
        } else {
            this._setMeta(Meta.FETCHING)
        }

        try {
            const nameTypeList = this._nameTypeQualificationEducationListStore.list || []
            let list: TypeQualificationEducation[] = []
            if (this._qualificationEducationListStore?.list?.[0]?.id) {
                yield this._typesQualificationEducationListStore?.load(
                    undefined,
                    [
                        {
                            key: 'education_id', value: this._qualificationEducationListStore?.list?.[0]?.id
                        }
                    ]
                )
                list = this._typesQualificationEducationListStore?.list?.items ?? []
            }


            this._list = nameTypeList.map((el) => {
                const findEl = list?.find((typeEl) => {
                    return typeEl.name_type === el.name
                })
                if (findEl) {
                    return {
                        type_id: el.id,
                        type_name: el.name,
                        ...findEl
                    }
                } else {
                    return {
                        type_id: el.id,
                        type_name: el.name,
                        license_number: null,
                        level: null,
                        start_date: null,
                        finish_date: null,
                        notes: null,
                        is_expired: null,
                        id: null,
                        education_id: null,
                        name_type: null

                    }
                }
            }) as QualificationEducationTableItemType[]
            runInAction(() => {
                this._typesQualificationEducationListStore.cleanList()
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            runInAction(() => {
                this._setMeta(Meta.ERROR)
            })
        }
    })
}
