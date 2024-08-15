import { LifeCycledModel, useMobXLocalStore } from 'shared/lib/mobx'
import CreateReportForm from './create-report-page-form-store.ts'

export class CreateReportStore implements LifeCycledModel {
    public createReportForm: CreateReportForm

    constructor() {
        this.createReportForm = new CreateReportForm()
    }

    init() {
    }

    destroy() {
    }

}

export const useCreateReportStore = () => {
    return useMobXLocalStore(() => new CreateReportStore())
}
