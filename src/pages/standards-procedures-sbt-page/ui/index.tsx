import { FC } from 'react'
import { HeadingPage } from 'shared/ui/heading-page'
import { ROUTES } from 'shared/config/routes'
import { useLifecycledModelEffect } from 'shared/lib/mobx'
import {
    StandardsProceduresSbtProvider,
    useStandardsProceduresSbtPageStore
} from 'pages/standards-procedures-sbt-page/model'
import { StandardsProceduresSbtTable } from 'features/standards-procedures-sbt-table'

export const StandardsProceduresSbtPage: FC = () => {
    const navItemPathname = ROUTES.STANDARDS_PROCEDURES_SBT

    const pageStore = useStandardsProceduresSbtPageStore()

    useLifecycledModelEffect(pageStore)

    return (
        <StandardsProceduresSbtProvider value={pageStore}>
            <HeadingPage navItemPathname={navItemPathname} />
            <StandardsProceduresSbtTable {...pageStore} />
        </StandardsProceduresSbtProvider>
    )
}
