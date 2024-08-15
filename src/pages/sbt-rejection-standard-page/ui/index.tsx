import { observer } from 'mobx-react-lite'
import { useLifecycledModelEffect } from 'shared/lib/mobx'
import { SbtRejectionStandardProvider, useSbtRejectionStandardPageStore } from 'pages/sbt-rejection-standard-page/model'
import { SbtRejectionStandardsTable } from 'features/sbt-rejection-table'
import { HeadingLevel, HeadingPage } from 'shared/ui/heading-page'
import { ROUTES } from 'shared/config/routes'

export const SbtRejectionStandardPage = observer(() => {
    const pageStore = useSbtRejectionStandardPageStore()

    useLifecycledModelEffect(pageStore)

    const navItemPathname = ROUTES.SBT_REJECTION_STANDARDS

    return (
        <>
            <HeadingPage level={HeadingLevel.H2} navItemPathname={navItemPathname} />
            <SbtRejectionStandardProvider value={pageStore}>
                <SbtRejectionStandardsTable sbtRejectionStandardsStore={pageStore.sbtRejectionStandardsStore}
                                            sbtRejectionStandardsListStore={pageStore.sbtRejectionStandardsListStore} />
            </SbtRejectionStandardProvider>
        </>

    )
})