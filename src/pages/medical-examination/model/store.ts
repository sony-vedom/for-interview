import { LifeCycledModel, useMobXLocalStore } from 'shared/lib/mobx'
import { UserStore } from 'entities/user/item/model/store'
import { MedicalExaminationListStore } from 'entities/medical-examination'
import { MedicalExaminationStore } from 'entities/medical-examination/model/store/medical-examination.ts'
import { SessionStore } from 'entities/session/model/store'

export class MedicalExaminationPageStore implements LifeCycledModel {
    public userStore: UserStore
    public medicalExaminationListStore: MedicalExaminationListStore
    public medicalExaminationStore: MedicalExaminationStore
    public sessionStore: SessionStore

    constructor(userId?: number) {
        this.sessionStore = new SessionStore()
        this.userStore = new UserStore({ userId: userId ?? this.sessionStore.viewer?.id })
        this.medicalExaminationListStore = new MedicalExaminationListStore([
            {
                key: 'user_id', value: userId ?? this.sessionStore.viewer?.id!
            }
        ])
        this.medicalExaminationStore = new MedicalExaminationStore({ root: this.medicalExaminationListStore })
    }

    init() {
        this.medicalExaminationListStore.init()
    }

    destroy() {
        this.medicalExaminationListStore?.destroy()
    }

}

export const useUserMedicalExaminationStore = (userId?: number) => {
    return useMobXLocalStore(() => new MedicalExaminationPageStore(userId))
}

