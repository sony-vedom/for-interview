import type { FC, PropsWithChildren } from 'react'
import { Box, Typography } from '@mui/material'
import { AppAvatar } from 'shared/ui/app-avatar'
import { ItemCardPaper, ItemCardWrapper } from 'shared/ui/item-card'
import { User } from 'entities/user/item'
import { observer } from 'mobx-react-lite'
import CircularProgress from '@mui/material/CircularProgress'

interface UserCardProps {
    user?: User | null
    position?: string | null
}

export const UserCard: FC<PropsWithChildren<UserCardProps>> = observer((props) => {
        const { user, position, children } =
            props
        if (!user) {
            return <Box sx={{display: "flex", justifyContent: "center"}}><CircularProgress color={"secondary"} size={80}/></Box>
        }
        const userName =
            `${user.last_name ?? ''} ${user.first_name ?? ''} ${user.second_name ?? ''}`
        return (
            <ItemCardWrapper>
                <ItemCardPaper
                    sx={{
                        display: { sm: 'flex', xs: 'grid' },
                        gap: '15px',
                        marginBottom: '10px'
                    }}>
                    <AppAvatar alt={userName} />
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            textAlign: { xs: 'center', sm: 'start' },
                            justifyContent: 'center'
                        }}>
                        <Typography component={'div'} variant="h5">
                            {userName}
                        </Typography>
                        <Typography component={'div'} variant="subtitle1" color={'secondary.dark'}>
                            {position ?? 'Должность не указана'}
                        </Typography>
                    </Box>
                </ItemCardPaper>
                <ItemCardPaper sx={{
                    display: 'grid',
                    gap: 3
                }}>
                    {children}
                </ItemCardPaper>
            </ItemCardWrapper>
        )
    }
)
