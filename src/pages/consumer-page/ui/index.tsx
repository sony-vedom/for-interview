import { FC } from 'react'
import { ConsumerTable } from 'features/consumer-table'
import { HeadingPage } from 'shared/ui/heading-page'
import { ROUTES } from 'shared/config/routes'
import { useLifecycledModelEffect } from 'shared/lib/mobx'
import { ConsumerProvider, useConsumerPageStore } from '../model'

export const ConsumerPage: FC = () => {
    const navItemPathname = ROUTES.CONSUMERS

    const consumerPageStore = useConsumerPageStore()

    useLifecycledModelEffect(consumerPageStore)

    return (
        <ConsumerProvider value={consumerPageStore}>
            <HeadingPage navItemPathname={navItemPathname} />
            <ConsumerTable consumerStore={consumerPageStore.consumerStore}
                           consumerListStore={consumerPageStore.consumerListStore} />
        </ConsumerProvider>
    )
}
