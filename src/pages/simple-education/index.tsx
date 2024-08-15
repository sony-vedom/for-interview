import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { useLifecycledModelEffect } from 'shared/lib/mobx'
import { SimpleEducationProvider, useSimpleEducationPageStore } from './model'
import { UserSimpleEducationTable } from './ui'

export const SimpleEducationPage = observer(() => {
    const { userId } = useParams()
    const userPageStore = useSimpleEducationPageStore(userId)

    useLifecycledModelEffect(userPageStore)

    return (
        <SimpleEducationProvider value={userPageStore}>
            <UserSimpleEducationTable/>
        </SimpleEducationProvider>
    )
})
