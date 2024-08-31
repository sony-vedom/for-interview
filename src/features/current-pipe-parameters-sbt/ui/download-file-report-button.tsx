import { FC } from 'react'
import { Meta } from 'shared/api'
import LoadingButton from '@mui/lab/LoadingButton'
import { ReportStore } from 'entities/report'
import { observer } from 'mobx-react-lite'

export const DownloadFileReportButton: FC<{
    reportStore: ReportStore
}> = observer((props) => {
    const { reportStore } = props
    return (
        <LoadingButton loading={reportStore.meta === Meta.FETCHING} onClick={() => {
            if (reportStore.elem?.id) {
                reportStore.downloadFileReport(reportStore.elem?.id)
            }
        }} color={'info'} variant={'contained'}>
            Скачать файл отчета
        </LoadingButton>
    )
})