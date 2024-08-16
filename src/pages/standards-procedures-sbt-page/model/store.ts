import { LifeCycledModel, useMobXLocalStore } from 'shared/lib/mobx'
import { StandardsProceduresSbtListStore, StandardsProceduresSbtStore } from 'entities/standards-procedures'

export class StandardsProceduresSbtPageStore implements LifeCycledModel {
    public standardsProceduresSbtStore: StandardsProceduresSbtStore
    public standardsProceduresSbtListStore: StandardsProceduresSbtListStore

    constructor() {
        this.standardsProceduresSbtListStore = new StandardsProceduresSbtListStore()
        this.standardsProceduresSbtStore = new StandardsProceduresSbtStore({ root: this.standardsProceduresSbtListStore })
    }

    init() {
        this.standardsProceduresSbtListStore.init()
    }

    destroy() {
        this.standardsProceduresSbtListStore.destroy()
    }

}

export const useStandardsProceduresSbtPageStore = () => {
    return useMobXLocalStore(() => new StandardsProceduresSbtPageStore())
}
