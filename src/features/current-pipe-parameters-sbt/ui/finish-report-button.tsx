import { FC, useState } from 'react'
import { TableActionsToolbar } from 'shared/ui/table'
import { ConfirmDialog } from 'shared/ui/confirm-dialog'
import { useModal } from 'shared/lib/modal'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { AppDatePicker } from 'shared/ui/date-picker'
import dayjs from 'dayjs'
import { Button, DialogTitle } from '@mui/material'
import DialogActions from '@mui/material/DialogActions'
import LoadingButton from '@mui/lab/LoadingButton'
import { ReportStore } from 'entities/report'
import { observer } from 'mobx-react-lite'

export const FinishReportButton: FC<{
    reportStore: ReportStore
}> = observer((props) => {
        const { reportStore } = props
        const { isOpen, handleModal } = useModal()
        const dataReportModal = useModal()
        const [dateFinish, setDateFinish] = useState<string>()
        return (
            <>
                <TableActionsToolbar.CreateButton
                    color={'secondary'}
                    createIconText={'Завершить отчет'}
                    handleCreate={() => {
                        handleModal()
                    }}
                />
                <ConfirmDialog
                    onConfirm={() => {
                        dataReportModal.handleModal()
                    }}
                    open={isOpen}
                    onClose={() => {
                        handleModal()
                    }}
                    dialogText={`Вы уверены, что хотите завершить отчет?`}
                />
                <Dialog open={dataReportModal.isOpen}>
                    <DialogTitle>Установить дату завершения отчета</DialogTitle>
                    <DialogContent sx={{
                        paddingTop: "10px !important"
                    }}>
                        <AppDatePicker fieldName={'date_finish_detection'}
                                       label={'Дата завершения отчета'}
                                       onChange={(date) => {
                                           setDateFinish(date)
                                       }}
                                       minDate={dayjs(Date.now())}
                        />
                    </DialogContent>
                    <DialogActions sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}>
                        <Button variant={"outlined"} color={"error"} onClick={() => {
                            dataReportModal.handleModal()
                        }}>
                            Отмена
                        </Button>
                        <LoadingButton variant={"contained"} onClick={() => {
                            if (reportStore.elem?.id && dateFinish) {
                                reportStore.finishReport(reportStore.elem?.id, {
                                    date_finish_detection: dateFinish as unknown as Date
                                }).then(() => {
                                    dataReportModal.handleModal()
                                })
                            }
                        }}>Сохранить</LoadingButton>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
)