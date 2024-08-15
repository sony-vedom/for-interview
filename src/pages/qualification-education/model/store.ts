import { LifeCycledModel, useMobXLocalStore } from 'shared/lib/mobx'
import { UserStore } from 'entities/user/item/model/store'
import { SessionStore } from 'entities/session/model/store'
import {
    getQualificationEducationUrlParams,
    QualificationEducationListStore,
    QualificationEducationStore
} from 'entities/qualification-education/item'
import {
    TypeQualificationEducationListStore,
    TypeQualificationEducationStore
} from 'entities/qualification-education/type'
import {
    NameTypeQualificationEducationListStore,
    NameTypeQualificationEducationStore
} from 'entities/qualification-education/name-type'
import { QualificationEducationTableStore } from 'features/qualification-education-table'

export class QualificationEducationPageStore implements LifeCycledModel {
    public userStore: UserStore
    public sessionStore: SessionStore

    public qualificationEducationStore: QualificationEducationStore
    public qualificationEducationListStore: QualificationEducationListStore

    public typeQualificationEducation: TypeQualificationEducationStore
    public typesQualificationEducationListStore: TypeQualificationEducationListStore

    public nameTypeQualificationEducation: NameTypeQualificationEducationStore
    public nameTypeQualificationEducationListStore: NameTypeQualificationEducationListStore

    public qualificationEducationTableStore: QualificationEducationTableStore

    constructor(userId?: number) {
        this.sessionStore = new SessionStore()
        this.userStore = new UserStore({ userId: userId ? userId : this.sessionStore.viewer?.id })

        this.qualificationEducationListStore = new QualificationEducationListStore([
            {key: "user_id", value: userId ? userId : this.sessionStore.viewer?.id!},
            {key: "kind", value: getQualificationEducationUrlParams()}
        ])
        this.qualificationEducationStore = new QualificationEducationStore({
            root: this.qualificationEducationListStore
        })

        this.typesQualificationEducationListStore = new TypeQualificationEducationListStore()
        this.typeQualificationEducation = new TypeQualificationEducationStore({})

        this.nameTypeQualificationEducationListStore = new NameTypeQualificationEducationListStore([
            {key: "kind", value: getQualificationEducationUrlParams()}
        ])
        this.nameTypeQualificationEducation = new NameTypeQualificationEducationStore({
            root: this.nameTypeQualificationEducationListStore
        })

        this.qualificationEducationTableStore = new QualificationEducationTableStore({
            qualificationEducationStore: this.qualificationEducationStore,
            qualificationEducationListStore: this.qualificationEducationListStore,

            typeQualificationEducation: this.typeQualificationEducation,
            typesQualificationEducationListStore: this.typesQualificationEducationListStore,

            nameTypeQualificationEducation: this.nameTypeQualificationEducation,
            nameTypeQualificationEducationListStore: this.nameTypeQualificationEducationListStore,

            userId: userId ? userId : this.sessionStore.viewer?.id!
        })

    }

    init() {
        this.qualificationEducationListStore.init()
        this.nameTypeQualificationEducationListStore.init()
        this.qualificationEducationTableStore.init()
    }

    destroy() {
        this.qualificationEducationListStore.destroy()
        this.nameTypeQualificationEducationListStore.destroy()
        this.qualificationEducationTableStore.destroy()
    }

}

export const useQualificationEducationPageStore = (userId?: number | string) => {
    return useMobXLocalStore(() => new QualificationEducationPageStore(Number(userId)))
}
