import { useMobXLocalStore } from 'shared/lib/mobx'
import { UserStore } from 'entities/user/item/model/store'
import { PositionListStore, PositionStore } from 'entities/position'
import { SessionStore } from 'entities/session/model/store'

function getUserIdFromPathname() {
    const pathname = window.location.pathname;
    const regex = /(?<=\/users\/)\d+/;
    const match = pathname.match(regex);
    return match ? Number(match[0]) : undefined;
}

export class UserPageStore {
    public userStore: UserStore
    public positionListStore: PositionListStore
    public positionStore: PositionStore
    public sessionStore: SessionStore

    constructor() {
        this.sessionStore = new SessionStore()
        this.userStore = new UserStore({ userId: getUserIdFromPathname() ?? this.sessionStore.viewer?.id })
        this.positionListStore = new PositionListStore()
        this.positionStore = new PositionStore({ root: this.positionListStore, id: this.userStore.user?.position_id })
    }
}

export const useUserPageStore = () => {
    return useMobXLocalStore(() => new UserPageStore())
}
