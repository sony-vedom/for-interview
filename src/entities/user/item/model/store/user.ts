import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import { User, UserEdit, UserWithPositionName } from 'entities/user/item'
import * as userApi from '../../api'
import { UserListStore } from './user-list.ts'
import { PositionStore } from 'entities/position/@x'

export class UserStore {
    private _meta: Meta = Meta.INITIAL
    private _user: UserWithPositionName | null = null
    private _root?: UserListStore

    constructor({ userId, root }: { userId?: number, root?: UserListStore }) {
        this._root = root
        makeAutoObservable<this, '_root'>(this, {
            _root: false
        })
        if (userId) {
            this.init(userId)
        }
    }

    get meta() {
        return this._meta
    }

    get user() {
        return this._user
    }

    private _setUser(user: User) {
        this._user = user
    }

    private _setMeta(meta: Meta) {
        this._meta = meta
    }

    public init(userId: number) {
        this.load(userId)
    }

    public async load(userId: number) {
        this._setMeta(Meta.LOADING)
        try {
            const usersResponse = await userApi.getUser({
                user_id: userId
            })
            const preparedUser: UserWithPositionName = {
                ...usersResponse,
            }
            if (usersResponse.position_id) {
                const positionStore =  new PositionStore({})
                await positionStore.load(usersResponse.position_id)
                preparedUser.position_name = positionStore.position?.name
            }
            runInAction(() => {
                this._setUser(preparedUser)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }

    public async edit(userId: number, body: UserEdit) {
        this._setMeta(Meta.EDITING)
        try {
            const usersResponse = await userApi.editUser({
                user_id: userId,
                ...body
            })
            if (this._root) {
                await this._root.load()
            }
            runInAction(() => {
                this._setUser(usersResponse)
                this._setMeta(Meta.SUCCESS)
            })
        } catch {
            this._setMeta(Meta.ERROR)
        }
    }
}
