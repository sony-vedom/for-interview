import { routerConfig } from './router'
import { RouterProvider } from 'react-router-dom'
import { AppThemeProvider } from 'shared/lib/theme'
import { AuthProvider } from 'entities/session'

function App() {
    return (
        <AppThemeProvider>
            <AuthProvider>
                <RouterProvider router={routerConfig} />
            </AuthProvider>
        </AppThemeProvider>
    )
}

export default App
