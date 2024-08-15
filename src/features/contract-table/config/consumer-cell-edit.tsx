import { FC } from 'react'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { Meta } from 'shared/api'
import CircularProgress from '@mui/material/CircularProgress'
import type { MRT_Row } from 'material-react-table'
import { Box } from '@mui/material'
import { AutoCompleteMobXField } from 'shared/ui/autocomplete'
import { useLifecycledModelEffect, useMobXLocalStore } from 'shared/lib/mobx'
import { ConsumerListStore, ConsumerStore } from 'entities/consumer/item'
import { Contract } from 'entities/contract/item'

export const ConsumerCell: FC<{ id: number }> = observer((props) => {
    const { id } = props
    const { elem, meta } = useLocalObservable(() => new ConsumerStore({ id }))
    return <>{meta === Meta.LOADING ? <CircularProgress /> : elem?.name}</>
})

export const ConsumerEdit: FC<{ id?: null | number, row: MRT_Row<Contract> }> = observer((props) => {
    const { id, row } = props
    const { elem, meta } = useLocalObservable(() => new ConsumerStore({ id }))
    const store = useMobXLocalStore(() => new ConsumerListStore())
    const list = store.list?.items
    const listMeta = store.meta
    useLifecycledModelEffect(store)
    if (!elem?.name && meta === Meta.LOADING || !list?.length && listMeta === Meta.LOADING) {
        return <CircularProgress sx={{ ml: '160px' }} />
    }
    return (
        <Box sx={{
            display: 'flex',
            gap: 1
        }}>
            <AutoCompleteMobXField data={list ?? []}
                                   label={'Заказчик'}
                                   defaultValue={elem?.name ? {
                                       id: row._valuesCache['consumer_id'],
                                       name: elem?.name
                                   } : undefined}
                                   onChangeParameterName={(rowId, _) => {
                                       row._valuesCache['consumer_id'] = rowId
                                   }} />
        </Box>
    )
})