import type { FC } from 'react'
import { ToolsPageProvider, useToolsPageStore } from 'pages/tools-page/model'
import { useLifecycledModelEffect } from 'shared/lib/mobx'
import { KindToolsTable } from 'features/kind-tools-table'

export const KindToolsPage: FC = () => {
    const toolsPageStore = useToolsPageStore()
    useLifecycledModelEffect(toolsPageStore)
    return (
        <ToolsPageProvider value={toolsPageStore}>
            <KindToolsTable {...toolsPageStore} />
        </ToolsPageProvider>
    )
}
