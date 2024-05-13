import { createContext, useContext } from 'react'
import { navItem } from './nav-item.ts'

const NavDataContext = createContext<navItem[]>([])
export const NavDataProvider = NavDataContext.Provider
export const useNavData = () => useContext(NavDataContext)
