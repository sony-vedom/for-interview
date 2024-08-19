import MuiTab from "@mui/material/Tab"
import MuiTabs from "@mui/material/Tabs"
import React, {type FC, useCallback} from "react";
import {TabsProps as MuiTabsProps} from "@mui/material/Tabs/Tabs";
import { navItemType } from 'shared/lib/navigation'
import { useNavigate } from 'react-router-dom'

export interface TabsProps extends MuiTabsProps {
    items: navItemType[],
    value: string | undefined,
    startHrefRedirect: string,
}

export const NavTabs: FC<TabsProps> = (props) => {
    const {items, value, startHrefRedirect, ...rest} = props

    const navigate = useNavigate();

    const handlerChangeRoute = useCallback((_: React.SyntheticEvent, value: string) => {
        navigate(value)
    }, [startHrefRedirect, value])

    return <MuiTabs {...rest} value={value} onChange={handlerChangeRoute} scrollButtons="auto">
        {items?.map(item => <MuiTab key={item.path} label={item.displayName} value={item.path}/>)}
    </MuiTabs>
}
