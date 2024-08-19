import { LifeCycledModel, useMobXLocalStore } from 'shared/lib/mobx'
import { ReportStore } from 'entities/report'
import { CurrentPipeParameters, CurrentPipeParametersList } from 'entities/current-pipe-parameters/item'

function getReportIdFromPathname() {
    const pathname = window.location.pathname
    const regex = /(?<=\/report\/)\d+/
    const match = pathname.match(regex)
    return match ? Number(match[0]) : undefined
}

export class ReportOnePageStore implements LifeCycledModel {
    public currentPipeParametersList: CurrentPipeParametersList
    public currentPipeParameters: CurrentPipeParameters
    public reportStore: ReportStore

    constructor() {
        const id = getReportIdFromPathname()
        this.reportStore = new ReportStore({ id })
        this.currentPipeParametersList = new CurrentPipeParametersList([
            { key: 'report_id', value: id ? id : '' }
        ])
        this.currentPipeParameters = new CurrentPipeParameters({
            root: this.currentPipeParametersList
        })
    }

    init() {
        this.currentPipeParametersList.init()
    }

    destroy() {
        this.currentPipeParametersList.destroy()
    }

}

export const useReportOnePageStore = () => {
    return useMobXLocalStore(() => new ReportOnePageStore())
}
