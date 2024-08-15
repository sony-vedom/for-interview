import { Navigate, useParams } from 'react-router-dom'
import { UserPageProvider, useUserPageStore } from 'pages/user-page/model'
import { observer } from 'mobx-react-lite'
import { UserCardWrapper } from 'pages/user-page/ui'

export const UserPage = observer(() => {
    const { userId } = useParams()

    const userPageStore = useUserPageStore()

    if (!userId) {
        return <Navigate to="/404" replace />
    }
    return (
        <UserPageProvider value={userPageStore}>
            <UserCardWrapper user={userPageStore.userStore.user!} />
        </UserPageProvider>
    )
})

export const ProfilePage = observer(() => {
    const userPageStore = useUserPageStore()


    return (
        <UserPageProvider value={userPageStore}>
            <UserCardWrapper user={userPageStore.userStore.user!} />
        </UserPageProvider>
    )
})
