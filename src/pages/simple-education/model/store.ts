import { LifeCycledModel, useMobXLocalStore } from 'shared/lib/mobx'
import { UserStore } from 'entities/user/item/model/store'
import { SessionStore } from 'entities/session/model/store'
import { SimpleEducationListStore, SimpleEducationStore } from 'entities/simple-education/item'
import {
    TypeSimpleEducationListStore,
    TypeSimpleEducationStore,
} from 'entities/simple-education/type'
import { SimpleEducationTableStore } from 'features/simple-education-table'

export class SimpleEducationPageStore implements LifeCycledModel {
    public userStore: UserStore
    public sessionStore: SessionStore

    public simpleEducationStore: SimpleEducationStore
    public simpleEducationListStore: SimpleEducationListStore

    public typesSimpleEducationStore: TypeSimpleEducationStore
    public typesSimpleEducationListStore: TypeSimpleEducationListStore

    public simpleEducationTableStore: SimpleEducationTableStore

    constructor(userId?: number) {
        this.sessionStore = new SessionStore()
        this.userStore = new UserStore({ userId: userId ? userId : this.sessionStore.viewer?.id })


        this.typesSimpleEducationListStore = new TypeSimpleEducationListStore()
        this.typesSimpleEducationStore = new TypeSimpleEducationStore({ root: this.typesSimpleEducationListStore })

        this.simpleEducationListStore = new SimpleEducationListStore()
        this.simpleEducationStore = new SimpleEducationStore({})

        this.simpleEducationTableStore = new SimpleEducationTableStore({
            typesSimpleEducationListStore: this.typesSimpleEducationListStore,
            simpleEducationListStore: this.simpleEducationListStore,
            userId: userId ? userId : this.sessionStore.viewer?.id!,
            simpleEducationStore: this.simpleEducationStore,
        })

    }

    init() {
        this.typesSimpleEducationListStore.init()
    }

    destroy() {
        this.typesSimpleEducationListStore.destroy()
    }

}

export const useSimpleEducationPageStore = (userId?: number | string) => {
    return useMobXLocalStore(() => new SimpleEducationPageStore(Number(userId)))
}

