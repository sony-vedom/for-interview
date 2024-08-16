import { LifeCycledModel, useMobXLocalStore } from 'shared/lib/mobx'
import { ReportListStore, ReportStore } from 'entities/report'

export class ReportPageStore implements LifeCycledModel {
    public reportStore: ReportStore
    public reportListStore: ReportListStore

    constructor() {
        this.reportListStore = new ReportListStore()
        this.reportStore = new ReportStore({root: this.reportListStore})
    }

    init() {
        this.reportListStore.init()
    }

    destroy() {
        this.reportListStore.destroy()
    }

}

export const useReportPageStore = () => {
    return useMobXLocalStore(() => new ReportPageStore())
}
