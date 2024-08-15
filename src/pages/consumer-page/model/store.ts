import { LifeCycledModel, useMobXLocalStore } from 'shared/lib/mobx'
import { ConsumerListStore, ConsumerStore } from 'entities/consumer/item'

export class ConsumerPageStore implements LifeCycledModel {
    public consumerStore: ConsumerStore
    public consumerListStore: ConsumerListStore

    constructor() {
        this.consumerListStore = new ConsumerListStore()
        this.consumerStore = new ConsumerStore({root: this.consumerListStore})
    }

    init() {
        this.consumerListStore.init()
    }

    destroy() {
        this.consumerListStore.destroy()
    }

}

export const useConsumerPageStore = () => {
    return useMobXLocalStore(() => new ConsumerPageStore())
}
