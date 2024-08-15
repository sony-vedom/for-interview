import { type FC } from 'react'
import {
    PipeParameter
} from 'entities/default-parameter'
import { CardContent } from '@mui/material'
import { DefaultParametersTable } from './default-parameters-table.tsx'
import { displayNamesPipeParameter } from 'entities/default-parameter/config'
import { CardLayout, CardStatus } from 'shared/ui/card-layout'

export const DefaultParametersCard: FC<{ data?: PipeParameter }> = (props) => {
    const { data } = props
    const preparedData = data
        ? Object.entries(displayNamesPipeParameter).flatMap(([key, value]) => {
            const item = key in data ? data[key as keyof typeof data] : null
            if (item != 'null') {
                return {
                    value: item,
                    displayName: value
                }
            }
            return []
        })
        : []
    return (
        <>
            <CardLayout cardHeaderProps={{ title: 'Заводские параметры трубы' }} status={CardStatus.SUCCESS}
                        minHeight={'426px'} minWidth={'650px'}>
                <CardContent
                    sx={{
                        display: 'flex',
                        gap: { sm: 2, xs: 1 },
                        padding: { sm: 2, xs: 1 },
                        flexDirection: { md: 'row', xs: 'column' },
                        minHeight: '426px',
                        minWidth: { md: '650px' }
                    }}>
                    <DefaultParametersTable
                        data={preparedData.slice(
                            0,
                            Math.floor((preparedData.length - 1) / 2)
                        )}
                    />
                    <DefaultParametersTable
                        data={preparedData.slice(
                            Math.floor((preparedData.length - 1) / 2),
                            preparedData.length - 1
                        )}
                    />

                </CardContent>
            </CardLayout>
        </>
    )
}
