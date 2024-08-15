import { type FC } from 'react'
import { Box } from '@mui/material'
import { maxWidth } from 'pages/create-report-page/ui'
import { AutoCompleteMobXField } from 'shared/ui/autocomplete'
import { observer } from 'mobx-react-lite'
import { useCreateReportPage } from 'pages/create-report-page/model'
import { AppMobXTextInput } from 'shared/ui/app-mobx-text-input'
import { useLifecycledModelEffect, useMobXLocalStore } from 'shared/lib/mobx'
import { ConsumerListStore } from 'entities/consumer/item'
import { ContractListStore } from 'entities/contract/item/model/store'

export const BasicDataFields: FC = observer(() => {
        const { createReportForm: form } = useCreateReportPage()
        const consumerList = useMobXLocalStore(() => new ConsumerListStore())
        useLifecycledModelEffect(consumerList)

        const contractList = useMobXLocalStore(() => new ContractListStore())
        useLifecycledModelEffect(contractList)

        return (
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: { xl: 3, xs: 2 },
                    alignItems: 'center',
                    justifyContent: 'center'

                }}>
                <Box sx={{
                    display: 'grid',
                    gap: 2,
                    maxWidth,
                    justifySelf: 'center',
                    width: '100%'
                }}>
                    <AppMobXTextInput
                        InputLabelProps={{ shrink: true }}
                        required
                        field={form.$('date_start_detection')
                        }
                    />
                    <AppMobXTextInput
                        required
                        field={form.$('location')}
                    />
                    <AppMobXTextInput
                        required
                        field={form.$('number_order')}
                    />
                </Box>
                <Box sx={{
                    display: 'grid',
                    gap: 2,
                    maxWidth,
                    justifySelf: 'center',
                    width: '100%'
                }}>
                    <AutoCompleteMobXField
                        key={consumerList?.list?.items[0]?.id ?? 'consumerList'}
                        data={consumerList?.list?.items ?? []}
                        label={form.$('customer').label}
                        onChangeParameterName={() => {
                            form.$('customer').onChange()
                        }} />
                    <AutoCompleteMobXField
                        key={contractList?.list?.[0]?.id ?? 'contractList'}
                        data={contractList?.list ?? []}
                        label={form.$('contract_number').label}
                        onChangeParameterName={() => {
                            form.$('customer').onChange()
                        }} />
                    <AppMobXTextInput
                        required
                        field={form.$('application')}
                    />
                </Box>
            </Box>
        )
    }
)