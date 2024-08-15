import { LifeCycledModel, useMobXLocalStore } from 'shared/lib/mobx'
import { ContractListStore, ContractStore } from 'entities/contract/item/model/store'

export class ContractPageStore implements LifeCycledModel {
    public contractStore: ContractStore
    public contractListStore: ContractListStore

    constructor() {
        this.contractListStore = new ContractListStore()
        this.contractStore = new ContractStore({root: this.contractListStore})
    }

    init() {
        this.contractListStore.init()
    }

    destroy() {
        this.contractListStore.destroy()
    }

}

export const useContractPageStore = () => {
    return useMobXLocalStore(() => new ContractPageStore())
}
