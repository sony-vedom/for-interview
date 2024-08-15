import { FC } from 'react'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { Meta } from 'shared/api'
import CircularProgress from '@mui/material/CircularProgress'
import type { MRT_Row } from 'material-react-table'
import { Box, IconButton, Tooltip } from '@mui/material'
import { AutoCompleteMobXField } from 'shared/ui/autocomplete'
import { useLifecycledModelEffect, useMobXLocalStore } from 'shared/lib/mobx'
import { SbtRejectionStandards } from 'entities/sbt-rejection-standards/item'
import {
    ThreadLockingConnectionList, ThreadLockingConnectionStore
} from 'entities/sbt-rejection-standards/thread-locking-connection'
import { ModalLayout } from 'shared/ui/modal-layout'
import { NestedForm } from 'shared/ui/nested-form'
import AddIcon from '@mui/icons-material/Add'
import { useModal } from 'shared/lib/modal'
import MyForm, { BEGIN_FIELDS } from 'shared/ui/nested-form/model/store.ts'
import { getDisabledButton } from 'shared/lib/form'

export const LockThreadEdit: FC<{ id?: null | number, row: MRT_Row<SbtRejectionStandards> }> = observer((props) => {
    const { row } = props
    const store = useMobXLocalStore(() => new ThreadLockingConnectionList())
    const threadLockingConnectionStore = useLocalObservable(() => new ThreadLockingConnectionStore({root: store}))
    const list = store.list
    const listMeta = store.meta
    useLifecycledModelEffect(store)
    const modal = useModal()
    const formStore = new MyForm({
        fields: list?.map(({ name, id }) => ({
            name: `${BEGIN_FIELDS}${id}`,
            label: 'Соединение',
            value: name,
            isEditMode: false,
            id: id
        }))
    }, {}, threadLockingConnectionStore)
    const disabledFormButton = getDisabledButton(threadLockingConnectionStore.meta) || getDisabledButton(store.meta)
    if (!list?.length && listMeta === Meta.LOADING) {
        return <CircularProgress sx={{ ml: '160px' }} />
    }
    return (
        <>
            <Box sx={{
                display: 'flex',
                gap: 1
            }}>
                <AutoCompleteMobXField sx={{
                    minWidth: '160px'
                }}
                                       key={row.original.lock_thread.id +  row.original.lock_thread.name}
                                       data={list ?? []}
                                       label={'Резьба зам. соед.'}
                                       defaultValue={row.original.lock_thread.id ? {
                                           id: row.original.lock_thread.id,
                                           name: row.original.lock_thread.name
                                       } : undefined}
                                       onChangeParameterName={(rowId, rowName) => {
                                           row._valuesCache['lock_thread.id'] = rowId
                                           row._valuesCache['lock_thread.name'] = rowName
                                       }} />
                <Tooltip title={'Добавить соединение'}>
                    <IconButton sx={(theme) => (
                        {
                            '&:hover': {
                                border: `1px solid ${theme.palette.primary.main} !important`
                            },
                            width: '30px',
                            height: '30px',
                            alignSelf: 'center'
                        }
                    )} onClick={modal.handleModal}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <ModalLayout isLoading={disabledFormButton} {...modal}>
                <NestedForm form={formStore} disabledFormButton={disabledFormButton} headerText={'Соединение'}
                            entityNameText={'соединение'} />
            </ModalLayout>
        </>
    )
})