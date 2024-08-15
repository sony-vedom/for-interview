import { observer } from 'mobx-react-lite'
import { Outlet, useParams } from 'react-router-dom'
import { useLifecycledModelEffect } from 'shared/lib/mobx'
import {
    QualificationEducationProvider,
    useQualificationEducationPageStore
} from './model'
import { UserQualificationEducationTable } from './ui'
import type { FC } from 'react'
import { ROUTES } from 'shared/config/routes'
import {
    NavigationQualificationEducation,
    useParamsQualificationEducation
} from 'features/navigation-qualification-education'
import { Box, Paper } from '@mui/material'
import { HeadingLevel, HeadingPage } from 'shared/ui/heading-page'

export const AsntPage = observer(() => {
    const { userId } = useParams()
    const qualificationEducationPageStore = useQualificationEducationPageStore(userId)

    useLifecycledModelEffect(qualificationEducationPageStore)

    return (
        <QualificationEducationProvider value={qualificationEducationPageStore}>
            <UserQualificationEducationTable/>
        </QualificationEducationProvider>
    )
})

export const SdankPage = observer(() => {
    const { userId } = useParams()
    const qualificationEducationPageStore = useQualificationEducationPageStore(userId)

    useLifecycledModelEffect(qualificationEducationPageStore)

    return (
        <QualificationEducationProvider value={qualificationEducationPageStore}>
            <UserQualificationEducationTable/>
        </QualificationEducationProvider>
    )
})



export const QualificationEducationPage: FC = observer(() => {
    const navItemPathname = ROUTES.SPECIALIZED_EDUCATION
    const paramsQualificationEducation = useParamsQualificationEducation()
    return (
        <Paper
            sx={(theme) => ({
                padding: { md: '10px', xs: '5px' },
                minWidth: { md: '300px', xs: 'calc(100% - 21px)' },
                border: `1px solid ${theme.palette.primary.main}`,
                boxShadow: 3
            })}>
            <HeadingPage level={HeadingLevel.H2} navItemPathname={navItemPathname} />
            <Box sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <NavigationQualificationEducation {...paramsQualificationEducation} />
            </Box>
            <Box
                sx={{
                    display: 'grid',
                    gap: '15px',
                    flex: 1,
                    mt: 2
                }}>
                <Outlet/>
            </Box>
        </Paper>
    )
})
