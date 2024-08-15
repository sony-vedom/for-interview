import { useMobXLocalStore } from 'shared/lib/mobx'
import { UserListStore, UserStore } from 'entities/user/item/model/store'
import { PositionListStore, PositionStore } from 'entities/position'

export class UsersListPageStore {
    public userListStore: UserListStore
    public userStore: UserStore
    public positionListStore: PositionListStore
    public positionStore: PositionStore

    constructor() {
        this.userListStore = new UserListStore()
        this.userStore = new UserStore({ root: this.userListStore })
        this.positionListStore = new PositionListStore()
        this.positionStore = new PositionStore({ root: this.positionListStore })
    }
}

export const useUserListPageStore = () => {
    return useMobXLocalStore(() => new UsersListPageStore())
}
