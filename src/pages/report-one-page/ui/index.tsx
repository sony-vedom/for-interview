import { HeadingPage } from 'shared/ui/heading-page'
import { ROUTES } from 'shared/config/routes'
import { useLifecycledModelEffect } from 'shared/lib/mobx'
import { ReportOnePageProvider, useReportOnePageStore } from 'pages/report-one-page/model'
import { Navigate, useParams } from 'react-router-dom'
import { CurrentPipeParametersSbtTable } from 'features/current-pipe-parameters-sbt'

export const ReportOnePage = () => {
    const { reportId } = useParams()
    const reportPageStore = useReportOnePageStore()

    if (!reportId) {
        return <Navigate to="/404" replace />
    }
    useLifecycledModelEffect(reportPageStore)
    return (
        <ReportOnePageProvider value={reportPageStore}>
            <HeadingPage navItemPathname={ROUTES.SBT} />
            <CurrentPipeParametersSbtTable {...reportPageStore} />
        </ReportOnePageProvider>
    )
}
