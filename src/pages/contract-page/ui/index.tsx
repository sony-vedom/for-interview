import { FC } from 'react'
import { HeadingPage } from 'shared/ui/heading-page'
import { ROUTES } from 'shared/config/routes'
import { ContractTable } from 'features/contract-table'
import { ContractProvider, useContractPageStore } from 'pages/contract-page/model'
import { useLifecycledModelEffect } from 'shared/lib/mobx'

export const ContractPage: FC = () => {
    const navItemPathname = ROUTES.CONTRACTS

    const contractPageStore = useContractPageStore()

    useLifecycledModelEffect(contractPageStore)

    return (
        <ContractProvider value={contractPageStore}>
            <HeadingPage navItemPathname={navItemPathname} />
            <ContractTable contractListStore={contractPageStore.contractListStore}
                           contractStore={contractPageStore.contractStore} />
        </ContractProvider>
    )
}
