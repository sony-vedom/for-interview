import { FC } from 'react'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { Meta } from 'shared/api'
import CircularProgress from '@mui/material/CircularProgress'
import type { MRT_Row } from 'material-react-table'
import { Box } from '@mui/material'
import { AutoCompleteMobXField } from 'shared/ui/autocomplete'
import { KindToolsList, KindToolStore } from 'entities/tools/kind'
import { Tool } from 'entities/tools/item'
import { useLifecycledModelEffect, useMobXLocalStore } from 'shared/lib/mobx'

export const KindToolsCell: FC<{ id: number }> = observer((props) => {
    const { id } = props
    const { elem, meta } = useLocalObservable(() => new KindToolStore({ id }))
    return <>{meta === Meta.LOADING ? <CircularProgress /> : elem?.name}</>
})

export const KindToolsEdit: FC<{ id?: null | number, row: MRT_Row<Tool> }> = observer((props) => {
    const { id, row } = props
    const { elem, meta } = useLocalObservable(() => new KindToolStore({ id }))
    const store = useMobXLocalStore(() => new KindToolsList())
    const list = store.list
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
                                   label={'Вид оборудования'}
                                   defaultValue={elem?.name ? {
                                       id: row._valuesCache['kind_id'],
                                       name: elem?.name
                                   } : undefined}
                                   onChangeParameterName={(rowId, _) => {
                                       row._valuesCache['kind_id'] = rowId
                                   }} />
        </Box>
    )
})