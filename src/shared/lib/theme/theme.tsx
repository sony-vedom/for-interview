import { themeConfig } from 'shared/lib/theme/index.ts'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { FC, ReactNode } from 'react'

interface AppThemeProps {
    children: ReactNode
}

export const AppTheme: FC<AppThemeProps> = ({ children }) => {
    return (
        <ThemeProvider theme={themeConfig}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
