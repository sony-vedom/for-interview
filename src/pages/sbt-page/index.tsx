import { BasePageLayout } from 'shared/ui/base-page-layout'
import { HeadingPage } from 'shared/ui/heading-page'
import { ROUTES } from 'shared/config/routes'
import { ReportTable } from 'features/report-table/ui'
import { mockData } from 'pages/sbt-page/mockData.ts'

export const SbtReportPage = () => {
    return (
        <>
            <BasePageLayout>
                <HeadingPage navItemPathname={ROUTES.SBT} />
                <ReportTable data={mockData} />
            </BasePageLayout>
        </>
    )
}
