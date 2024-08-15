import { routerConfig } from './router'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppTheme } from 'shared/lib/theme'
import { model } from 'entities/session'
import { NavDataProvider } from 'shared/lib/navigation'

const browserRouter = createBrowserRouter(routerConfig)

function App() {
    const sessionStore = model.useSessionStore()
    return (
        <NavDataProvider value={routerConfig}>
            <AppTheme>
                <model.SessionProvider value={sessionStore}>
                    <RouterProvider router={browserRouter} />
                </model.SessionProvider>
            </AppTheme>
        </NavDataProvider>
    )
}

export default App
