import { LifeCycledModel, useMobXLocalStore } from 'shared/lib/mobx'
import CreateReportForm from './create-report-page-form-store.ts'
import { ReportStore } from 'entities/report'
import { SessionStore } from 'entities/session/model/store'
import { ToolStore } from 'entities/tools/item'

export class CreateReportStore implements LifeCycledModel {
    public createReportForm: CreateReportForm
    public reportStore: ReportStore
    public sessionStore: SessionStore
    public toolStore: ToolStore

    constructor() {
        this.reportStore = new ReportStore({})
        this.sessionStore = new SessionStore()
        this.toolStore = new ToolStore({})
        this.createReportForm = new CreateReportForm(
            undefined, {}, this.reportStore, this.sessionStore, this.toolStore
        )
    }

    init() {
    }

    destroy() {
        this.createReportForm.dispose()
    }
}

export const useCreateReportStore = () => {
    return useMobXLocalStore(() => new CreateReportStore())
}
