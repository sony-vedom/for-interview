import { HeadingPage } from 'shared/ui/heading-page'
import { ROUTES } from 'shared/config/routes'
import { ReportTable } from 'features/report-table/ui'
import { mockData } from 'pages/sbt-page/mockData.ts'

export const SbtReportPage = () => {
    return (
        <>

                <HeadingPage navItemPathname={ROUTES.SBT} />
                <ReportTable data={mockData} />
        </>
    )
}
