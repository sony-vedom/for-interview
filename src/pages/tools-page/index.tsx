import { FC, useMemo } from 'react'
import { HeadingPage } from 'shared/ui/heading-page'
import { ROUTES } from 'shared/config/routes'
import { type MRT_ColumnDef } from 'material-react-table'
import { useNavItem } from 'shared/lib/navigation'
import { NavTabs } from 'shared/ui/nav-tabs'
import { Outlet, useLocation } from 'react-router-dom'
import { Paper } from '@mui/material'

interface Tools {

}

export const ToolsPage: FC = () => {
    const navItemPathname = ROUTES.TOTAL_TOOLS

    const columns = useMemo<MRT_ColumnDef<Tools>[]>(() => [{
            accessorKey: 'serial_number',
            header: 'Серийный номер',
            size: 150
        }],
        []
    )

    const navItem = useNavItem(navItemPathname)
    const location = useLocation()
    return (
        <>
            <HeadingPage navItemPathname={navItemPathname} />
            <Paper sx={{ width: '100%' }}>
                {/*<NavTabs value={navItem?.children?.find(el => el.path.include(location.pathname))} startHrefRedirect={navItemPathname}*/}
                {/*         items={navItem?.children ?? []} />*/}
            </Paper>
            {/*<TableBase columns={columns} data={[]} />*/}
            <Outlet />
        </>
    )
}
