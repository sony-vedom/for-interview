import type { FC } from 'react'
import { ToolsPageProvider, useToolsPageStore } from 'pages/tools-page/model'
import { useLifecycledModelEffect } from 'shared/lib/mobx'
import { ToolsTable } from 'features/tools-table'

export const ToolsIndexPage: FC = () => {
    const toolsPageStore = useToolsPageStore()
    useLifecycledModelEffect(toolsPageStore)
    return (
        <ToolsPageProvider value={toolsPageStore}>
            <ToolsTable {...toolsPageStore}/>
        </ToolsPageProvider>
    )
}
