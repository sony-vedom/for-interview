import { FC, useEffect } from 'react'
import { maxWidth } from 'pages/create-report-page/config'
import { AutoCompleteMobXField } from 'shared/ui/autocomplete'
import { Box } from '@mui/material'
import { useMobXLocalStore } from 'shared/lib/mobx'
import { UserListStore } from 'entities/user/item/model/store'
import { useCreateReportPage } from 'pages/create-report-page/model'
import { observer } from 'mobx-react-lite'
import { useSession } from 'entities/session'

export const UserField: FC = observer(() => {
    const { createReportForm: form } = useCreateReportPage()
    const userListStore = useMobXLocalStore(() => new UserListStore())
    const preparedList = userListStore.list?.map(({ id, first_name, last_name }) => {
        return {
            id,
            name: `${first_name ?? ''} ${last_name ?? ''}`
        }
    })

    const session = useSession()

    useEffect(() => {
        if (session?.viewer) {
            form.$('user').onChange({
                id: session?.viewer?.id,
                name: `${session?.viewer?.first_name ?? ''} ${session?.viewer?.last_name}`
            })
        }
    }, [])

    return <Box
        sx={{
            display: 'grid',
            maxWidth,
            gap: 2,
            justifySelf: 'center',
            width: '100%',
            alignContent: 'start',
            paddingBottom: 2
        }}>
        <AutoCompleteMobXField
            data={preparedList ?? undefined}
            label={form.$('user').label}
            defaultValue={form.$('user').value}
            onChangeParameterName={(rowId, rowName) => {
                form.$('user').onChange({
                    id: rowId,
                    name: rowName
                })
            }}
            textFieldProps={{
                required: true
            }}

        />
    </Box>
})