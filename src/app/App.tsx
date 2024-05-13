import { routerConfig } from './router'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppTheme } from 'shared/lib/theme'
import { AuthProvider } from 'entities/session'
import { NavDataProvider } from 'shared/lib/navigation'

const browserRouter = createBrowserRouter(routerConfig)

function App() {
    return (
        <NavDataProvider value={routerConfig}>
            <AppTheme>
                <AuthProvider>
                    <RouterProvider router={browserRouter} />
                </AuthProvider>
            </AppTheme>
        </NavDataProvider>
    )
}

export default App
