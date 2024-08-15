import { LifeCycledModel, useMobXLocalStore } from 'shared/lib/mobx'
import { SbtRejectionStandardsListStore, SbtRejectionStandardsStore } from 'entities/sbt-rejection-standards/item'

export class SbtRejectionStandardPageStore implements LifeCycledModel {
    public sbtRejectionStandardsListStore: SbtRejectionStandardsListStore
    public sbtRejectionStandardsStore: SbtRejectionStandardsStore

    constructor() {
        this.sbtRejectionStandardsListStore = new SbtRejectionStandardsListStore()
        this.sbtRejectionStandardsStore = new SbtRejectionStandardsStore({
            root: this.sbtRejectionStandardsListStore
        })
    }

    init() {
        this.sbtRejectionStandardsListStore.init()
    }

    destroy() {
        this.sbtRejectionStandardsListStore?.destroy()
    }

}

export const useSbtRejectionStandardPageStore = () => {
    return useMobXLocalStore(() => new SbtRejectionStandardPageStore())
}

