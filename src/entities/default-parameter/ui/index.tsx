import { type FC } from 'react'
import {
    displayNamesPipeParameter,
    PipeParameter
} from 'entities/default-parameter'
import { Card, CardContent, CardHeader } from '@mui/material'
import { DefaultParametersTable } from './default-parameters-table.tsx'

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
        <Card>
            <CardHeader
                sx={{ textAlign: 'center' }}
                titleTypographyProps={{
                    variant: 'h6',
                    sx: {
                        fontWeight: 600
                    }
                }}
                title="Заводские параметры трубы"
                subheader={!data ? 'Данных пока нет...' : undefined}
                subheaderTypographyProps={{
                    component: 'div',
                    sx: {
                        marginTop: '15px !important'
                    }
                }}
            />
            <CardContent
                sx={{
                    display: 'flex',
                    gap: { sm: 2, xs: 1 },
                    padding: { sm: 2, xs: 1 },
                    flexDirection: { md: 'row', xs: 'column' },
                    maxWidth: '1100px',
                    minHeight: '426px'
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
        </Card>
    )
}
