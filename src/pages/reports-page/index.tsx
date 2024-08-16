import { HeadingPage } from 'shared/ui/heading-page'
import { ROUTES } from 'shared/config/routes'
import { ReportTable } from 'features/report-table/ui'
import { ReportsPageProvider, useReportPageStore } from 'pages/reports-page/model'
import { useLifecycledModelEffect } from 'shared/lib/mobx'

export const SbtReportPage = () => {
    const reportPageStore = useReportPageStore()
    useLifecycledModelEffect(reportPageStore)
    return (
        <ReportsPageProvider value={reportPageStore}>
            <HeadingPage navItemPathname={ROUTES.SBT} />
            <ReportTable {...reportPageStore} />
        </ReportsPageProvider>
    )
}
