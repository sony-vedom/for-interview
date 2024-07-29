import { createContext, useContext } from 'react'
import { navItemType } from './nav-item.ts'

const NavDataContext = createContext<navItemType[]>([])
export const NavDataProvider = NavDataContext.Provider
export const useNavData = () => useContext(NavDataContext)
