import { FC } from 'react'
import { ROUTES } from 'shared/config/routes'
import { observer } from 'mobx-react-lite'
import { Box, Paper } from '@mui/material'
import { HeadingLevel, HeadingPage } from 'shared/ui/heading-page'
import { useSimpleEducationPage } from 'pages/simple-education/model'
import {
    SimpleEducationTable
} from 'features/simple-education-table'

export const UserSimpleEducationTable: FC = observer(() => {
    const navItemPathname = ROUTES.NON_SPECIALIZED_EDUCATION

    const {
        userStore,
        simpleEducationTableStore,
        typesSimpleEducationStore,
        typesSimpleEducationListStore
    } = useSimpleEducationPage()

    return (
        <Paper
            sx={(theme) => ({
                padding: { md: '10px', xs: '5px' },
                minWidth: { md: '300px', xs: 'calc(100% - 21px)' },
                border: `1px solid ${theme.palette.primary.main}`,
                boxShadow: 3
            })}>
            <HeadingPage level={HeadingLevel.H2} navItemPathname={navItemPathname} />
            <Box
                sx={{
                    display: 'grid',
                    gap: '15px',
                    flex: 1,
                }}>
                <SimpleEducationTable typesSimpleEducationStore={typesSimpleEducationStore}
                                      typesSimpleEducationListStore={typesSimpleEducationListStore}
                                      userId={userStore?.user?.id}
                                      simpleEducationTableStore={simpleEducationTableStore} />
            </Box>
        </Paper>
    )
})