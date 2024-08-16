import { User } from 'entities/user/item/@x'
import { makeAutoObservable, runInAction } from 'mobx'
import { Meta } from 'shared/api'
import { getLocalStorage, setLocalStorage } from 'shared/lib/localStorage'
import * as sessionApi from '../../api'
import { keycloakLogin, logout } from '../../api'
import { useMobXLocalStore } from 'shared/lib/mobx'
import { ACCESS } from 'shared/config/api'
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
        if (!localStorage.getItem(ACCESS)) {
            return
        }
        this.setMeta(Meta.LOADING)
        try {
            this._viewer = getLocalStorage('user', null)()
            if (this._viewer) {
                this.setMeta(Meta.SUCCESS)
            }
            if (!this._viewer) {
                const userResponse = await sessionApi.getUserMe()
                runInAction(() => {
                    setLocalStorage('user', userResponse)
                    this._viewer = userResponse
                    this.setMeta(Meta.SUCCESS)
                })
            }
        } catch {
            this.setMeta(Meta.ERROR)

        }
    }

    public init() {
        this.load()
    }

    public async login(code: string) {
        await this.keyCloackLogin(code)
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
            await logout()
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

    private async keyCloackLogin(code: string) {
        this.setMeta(Meta.LOADING)
        try {
            const responseToken = await keycloakLogin({ code })
            localStorage.setItem(ACCESS, responseToken.access)
            runInAction(() => {
                this.setMeta(Meta.SUCCESS)
            })
        } catch (e) {
            this.setMeta(Meta.ERROR)
        }
    }
}

export const useSessionStore = () => {
    return useMobXLocalStore(
        () => new SessionStore()
    )
}
