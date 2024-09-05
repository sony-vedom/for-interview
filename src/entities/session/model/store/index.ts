import { User } from 'entities/user/item/@x'
import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import { getLocalStorage } from 'shared/lib/localStorage'
import { useMobXLocalStore } from 'shared/lib/mobx'
import { ROUTES } from 'shared/config/routes'

export class SessionStore {
    private _viewer: User | null = null
    private _meta: Meta = Meta.INITIAL

    constructor() {
        makeAutoObservable(this, {})
        this.init()
    }

    get viewer() {
        return this._viewer
    }

    get meta() {
        return this._meta
    }

    public async load() {
        if (this._meta === Meta.LOADING) {
            return
        }
        this.setMeta(Meta.LOADING)
        try {
            this._viewer = getLocalStorage('user', null)()
            if (this._viewer) {
                this.setMeta(Meta.SUCCESS)
            }
            if (!this._viewer) {
                (() => {
                    throw new Error('No user')
                })()
            }
        } catch {
            this.setMeta(Meta.ERROR)

        }
    }

    public async init() {
        await this.load()
    }

    public async logout() {
        if (this._meta === Meta.LOADING) {
            return
        }
        this.setMeta(Meta.LOADING)
        try {
            runInAction(() => {
                this._viewer = null
                localStorage.clear()
            })
            window.location.href = ROUTES.LOGIN
            runInAction(() => {
                this.setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            runInAction(() => {
                this._viewer = null
                localStorage.clear()
                this.setMeta(Meta.SUCCESS)
            })
            window.location.href = ROUTES.LOGIN
        }

    }

    private setMeta(meta: Meta) {
        this._meta = meta
    }
}

export const useSessionStore = () => {
    return useMobXLocalStore(
        () => new SessionStore()
    )
}
