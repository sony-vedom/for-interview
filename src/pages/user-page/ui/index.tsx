import { User, UserCard } from 'entities/user/item'
import { Outlet } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Box } from '@mui/material'
import { NavigationEducation } from 'features/navigation-education'
import { useSession } from 'entities/session'
import { getNavItems } from 'app/router/getNavItems.ts'
import { navigationConfig } from 'app/router'
import { FC } from 'react'
import { useUserPage } from 'pages/user-page/model'

export const UserCardWrapper: FC<{
    user: User,
}> = observer((props) => {
    const {user} = props
    const session = useSession()
    const navItems = getNavItems(navigationConfig.user[0].children!, session?.viewer)
    const {userStore} = useUserPage()
    return (
        <UserCard
            position={userStore.user?.position_name}
            user={user}
        >
            <NavigationEducation navItems={navItems} />
            <Box
                sx={{
                    display: 'grid',
                    gap: '20px',
                    gridTemplateColumns: {
                        md: 'repeat(1fr)'
                    }
                }}>
                <Outlet />
            </Box>
        </UserCard>
    )
})
