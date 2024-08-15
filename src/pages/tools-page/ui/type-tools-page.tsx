import type { FC } from 'react'
import { ToolsPageProvider, useToolsPageStore } from 'pages/tools-page/model'
import { useLifecycledModelEffect } from 'shared/lib/mobx'
import { TypeToolsTable } from 'features/type-tools-table'

export const TypeToolsPage: FC = () => {
    const toolsPageStore = useToolsPageStore()
    useLifecycledModelEffect(toolsPageStore)
    return (
        <ToolsPageProvider value={toolsPageStore}>
            <TypeToolsTable {...toolsPageStore} />
        </ToolsPageProvider>
    )
}
