import { LifeCycledModel, useMobXLocalStore } from 'shared/lib/mobx'
import { ToolsList, ToolStore } from 'entities/tools/item'
import { KindToolsList, KindToolStore } from 'entities/tools/kind'
import { TypeToolsList, TypeToolStore } from 'entities/tools/type'

export class ToolsPageStore implements LifeCycledModel {
    public toolStore: ToolStore
    public toolsListStore: ToolsList

    public kindToolStore: KindToolStore
    public kindToolsListStore: KindToolsList

    public typeToolStore: TypeToolStore
    public typeToolsListStore: TypeToolsList

    constructor() {
        this.toolsListStore = new ToolsList()
        this.toolStore = new ToolStore({ root: this.toolsListStore })

        this.kindToolsListStore = new KindToolsList()
        this.kindToolStore = new KindToolStore({ root: this.kindToolsListStore })

        this.typeToolsListStore = new TypeToolsList()
        this.typeToolStore = new TypeToolStore({
            root: this.typeToolsListStore
        })
    }

    init() {
        this.toolsListStore.init()
        this.kindToolsListStore.init()
        this.typeToolsListStore.init()
    }

    destroy() {
        this.toolsListStore.destroy()
        this.kindToolsListStore.destroy()
        this.typeToolsListStore.destroy()
    }
}

export const useToolsPageStore = () => {
    return useMobXLocalStore(() => new ToolsPageStore())
}
