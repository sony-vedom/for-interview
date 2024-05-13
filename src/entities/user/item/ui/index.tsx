import type { FC, ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { AppAvatar } from 'shared/ui/app-avatar'
import { ItemCardPaper, ItemCardWrapper } from 'shared/ui/item-card'

interface UserCardProps {
    user: {
        firstName: string
        secondName: string
        photoUrl: string | null
        lastName: string
        position: string
        birthday: string
    }
    qualificationASNTComponent: ReactNode
    qualificationSDANKComponent: ReactNode
}

export const UserCard: FC<UserCardProps> = (props) => {
    const { user, qualificationASNTComponent, qualificationSDANKComponent } =
        props
    const userName =
        user.lastName + ' ' + user.firstName + ' ' + user.secondName
    const birthdayFormatted = dayjs(user.birthday).format('DD.MM.YYYY')
    return (
        <ItemCardWrapper cardProps={{ sx: { maxWidth: '1000px' } }}>
            <ItemCardPaper
                sx={{
                    display: { sm: 'flex', xs: 'grid' },
                    gap: '15px',
                    marginBottom: '10px'
                }}>
                <AppAvatar alt={userName} src={`${user.photoUrl}`} />
                <Box
                    sx={{
                        width: '100%',
                        display: 'grid',
                        justifySelf: { xs: 'center', sm: 'stretch' },
                        justifyContent: { xs: 'center', sm: 'stretch' },
                        textAlign: { xs: 'center', sm: 'start' }
                    }}>
                    <Typography component={'div'} variant="h5">
                        {userName}
                    </Typography>
                    <Typography
                        component={'div'}
                        color={(theme) => theme.palette.text.secondary}
                        variant="subtitle1">
                        {birthdayFormatted}
                    </Typography>
                    <Typography component={'div'} variant="subtitle1">
                        {user.position}
                    </Typography>
                </Box>
            </ItemCardPaper>
            <ItemCardPaper>
                <Box
                    sx={{
                        display: 'grid',
                        gap: '20px',
                        gridTemplateColumns: {
                            md: '1fr 1fr'
                        }
                    }}>
                    {qualificationASNTComponent}
                    {qualificationSDANKComponent}
                </Box>
            </ItemCardPaper>
        </ItemCardWrapper>
    )
}
