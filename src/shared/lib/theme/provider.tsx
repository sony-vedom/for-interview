import { themeConfig } from 'shared/lib/theme/index.ts'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { FC, ReactNode } from 'react'

interface AppThemeProviderProps {
    children: ReactNode
}

export const AppThemeProvider: FC<AppThemeProviderProps> = ({ children }) => {
    return (
        <ThemeProvider theme={themeConfig}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
