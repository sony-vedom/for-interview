import { FC } from 'react'
import { TableActionsToolbar } from 'shared/ui/table'
import { ConfirmDialog } from 'shared/ui/confirm-dialog'
import { useModal } from 'shared/lib/modal'

export const FinishReportButton: FC = () => {
    const { isOpen, handleModal } = useModal()
    return (
        <>
            <TableActionsToolbar.CreateButton
                color={"secondary"}
                createIconText={'Завершить отчет'}
                handleCreate={() => {
                    handleModal()
                }}
            />
            <ConfirmDialog
                onConfirm={() => {

                }}
                open={isOpen}
                onClose={() => {
                    handleModal()
                }}
                dialogText={`Вы уверены, что хотите завершить отчет?`}
            />
        </>
    )
}
