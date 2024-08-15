import {
    SimpleEducation,
    SimpleEducationCreate, SimpleEducationEdit,
    SimpleEducationListStore,
    SimpleEducationStore
} from 'entities/simple-education/item'
import { TypeSimpleEducationListStore } from 'entities/simple-education/type'
import { Meta } from 'shared/api'
import { flow, makeAutoObservable, reaction, runInAction } from 'mobx'

export type SimpleEducationTableItemType = {
    type_id: number,
    type_name: string
} & SimpleEducation


export class SimpleEducationTableStore {
    private _typesSimpleEducationListStore: TypeSimpleEducationListStore
    private _simpleEducationListStore: SimpleEducationListStore
    private _simpleEducationStore: SimpleEducationStore
    private _list?: SimpleEducationTableItemType[] | null = null
    private _disposers: any[] = []
    private _meta: Meta = Meta.INITIAL
    private _userId: number | null = null

    constructor(props: {
        typesSimpleEducationListStore: TypeSimpleEducationListStore,
        simpleEducationListStore: SimpleEducationListStore,
        simpleEducationStore: SimpleEducationStore,
        userId: number
    }) {
        makeAutoObservable(this)
        this._typesSimpleEducationListStore = props.typesSimpleEducationListStore
        this._simpleEducationListStore = props.simpleEducationListStore
        this._simpleEducationStore = props.simpleEducationStore
        this._userId = props.userId
        this._disposers.push(
            reaction(() => this._typesSimpleEducationListStore.list, () => {
                this.loadTableList()
            })
        )
    }

    get list() {
        return this._list
    }

    get meta() {
        return this._meta
    }

    async init() {
        this.loadTableList()
    }

    destroy() {
        this._disposers.forEach(dispose => dispose())
    }

    private _setMeta(meta: Meta) {
        this._meta = meta
    }

    public async create(args: SimpleEducationCreate) {
        await this._simpleEducationStore.create(args)
        await this.loadTableList()
    }

    public async delete(id: number) {
        await this._simpleEducationStore.delete(id)
        await this.loadTableList()
    }

    public async edit(id: number, args: SimpleEducationEdit) {
        await this._simpleEducationStore.edit(id, args)
        await this.loadTableList()
    }

    loadTableList = flow(function* (this: SimpleEducationTableStore) {
        if (!this._list) {
            this._setMeta(Meta.LOADING)
        } else {
            this._setMeta(Meta.FETCHING)
        }
        try {
            const typeList = this._typesSimpleEducationListStore.list || []
            let promises: any[] = []
            for (let i = 0; i < typeList.length; i++) {
                const el = typeList[i]
                yield this._simpleEducationListStore.load(
                    [
                        {
                            key: 'user_id', value: this._userId!
                        },
                        {
                            key: 'type_id', value: el.id
                        }
                    ]
                )
                const storeSimpleEdu = this._simpleEducationListStore.list?.items[0]
                if (storeSimpleEdu) {
                    promises.push({
                        type_id: el.id,
                        type_name: el.name,
                        start_date: storeSimpleEdu.start_date,
                        finish_date: storeSimpleEdu.finish_date,
                        notes: storeSimpleEdu.notes,
                        is_expired: storeSimpleEdu.is_expired,
                        id: storeSimpleEdu.id,
                        type_education: storeSimpleEdu.type_education
                    })
                } else {
                    promises.push({
                        type_id: el.id,
                        type_name: el.name,
                        start_date: null,
                        finish_date: null,
                        notes: null,
                        is_expired: null,
                        id: null,
                        type_education: null
                    })
                }
                this._simpleEducationListStore.cleanList()
            }
            yield Promise.all(promises).then((res) => {
                runInAction(() => {
                    this._list = res.filter(item => item !== null) as SimpleEducationTableItemType[] as SimpleEducationTableItemType[]

                })
            })
            runInAction(() => {
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            runInAction(() => {
                this._setMeta(Meta.ERROR)
            })
        }
    })
}
