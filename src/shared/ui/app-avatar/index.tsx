import { Avatar, type AvatarProps } from '@mui/material'
import { type FC } from 'react'

export const AppAvatar: FC<AvatarProps> = (props) => {
    return (
        <Avatar
            sx={{
                width: { xs: '76px', md: '96px' },
                height: { xs: '76px', md: '96px' },
                justifySelf: { xs: 'center', sm: 'stretch' }
            }}
            {...props}
        />
    )
}
