import type { MRT_ColumnDef, MRT_Row } from 'material-react-table'
import { User } from 'entities/user/item'
import { AutoCompleteMobXField } from 'shared/ui/autocomplete'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useUserPage } from 'pages/users-page/model'
import { NestedForm } from 'shared/ui/nested-form'
import { useModal } from 'shared/lib/modal'
import { Box, IconButton, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MyForm, { BEGIN_FIELDS } from 'shared/ui/nested-form/model/store.ts'
import { TableActionsRow } from 'shared/ui/table'
import { useSession } from 'entities/session'
import { ROUTES } from 'shared/config/routes'
import { getDisabledButton } from 'shared/lib/form'
import { ModalLayout } from 'shared/ui/modal-layout'

const PositionEdit: FC<{ row: MRT_Row<User> }> = observer((props) => {
    const {row} = props
    const { positionListStore, positionStore } = useUserPage()
    const modal = useModal()
    const formStore = new MyForm({
        fields: positionListStore.list?.map(({ name, id }) => ({
            name: `${BEGIN_FIELDS}${id}`,
            label: 'Должность',
            value: name,
            isEditMode: false,
            id: id
        }))
    }, {}, positionStore)
    const disabledFormButton = getDisabledButton(positionStore.meta) || getDisabledButton(positionListStore.meta)
    return <>
        <Box sx={{
            display: 'flex',
            gap: 1
        }}>
            <AutoCompleteMobXField data={positionListStore.list ?? []}
                                   label={'Должность'}
                                   defaultValue={row.original[`position_id`] && row.original[`position_name`] ? {
                                       id: row.original[`position_id`],
                                       name: row.original[`position_name`]
                                   } : undefined}
                                   onChangeParameterName={(rowId, _) => {
                                       row._valuesCache['position_id'] = rowId
                                   }} />
            <Tooltip title={'Добавить должность'}>
                <IconButton sx={(theme) => (
                    {
                        '&:hover': {
                            border: `1px solid ${theme.palette.primary.main} !important`
                        },
                        width: '35px',
                        height: '35px',
                        alignSelf: 'center'
                    }
                )} onClick={modal.handleModal}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
        </Box>
        <ModalLayout isLoading={disabledFormButton} {...modal}>
            <NestedForm form={formStore} disabledFormButton={disabledFormButton} headerText={'Должности'}
                        entityNameText={'должность'} />
        </ModalLayout>

    </>
})

export const userTableConfig: MRT_ColumnDef<User>[] = [
    {
        accessorKey: 'last_name',
        header: 'Фамилия',
        Cell: ({ table, row, cell }) => {
            const session = useSession()
            return (
                <TableActionsRow.SinglePageLink
                    singlePageLink={session?.viewer?.id !== row.original.id ? `${table.getRow(row.id).original.id}` : `${ROUTES.PROFILE}`}
                    entityNameText={'сотрудника'}>
                    {cell.getValue() as string}
                </TableActionsRow.SinglePageLink>

            )
        }
    },
    {
        accessorKey: 'first_name',
        header: 'Имя'
    },
    {
        accessorKey: 'second_name',
        header: 'Отчество'
    },
    {
        accessorKey: 'position_name',
        header: 'Должность',
        size: 150,
        minSize: 380,
        Edit: ({ row }) => {
            return <PositionEdit row={row} />
        }
    }
]
