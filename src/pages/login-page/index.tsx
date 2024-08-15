import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Navigate, useSearchParams } from 'react-router-dom'
import { Box, Button, LinearProgress } from '@mui/material'
import ReplayIcon from '@mui/icons-material/Replay'
import CircularProgress from '@mui/material/CircularProgress'
import { useSession } from 'entities/session'
import { Meta } from 'shared/api'

export const LoginPage = observer(() => {
    const sessionStoreContext = useSession()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        if (!sessionStoreContext?.viewer && searchParams.size && searchParams.get('code')) {
            sessionStoreContext?.login(searchParams.get('code')!)
        }
    }, [])

    useEffect(() => {
        if (!sessionStoreContext?.viewer && !searchParams.size) {
            window.location.href = import.meta.env.VITE_REDIRECT_KEYCLOAK_REDIRECT
        }
    }, [])

    if (sessionStoreContext?.viewer) {
        return <Navigate to={'/'} replace />
    }

    if (!sessionStoreContext?.viewer && searchParams.size && (sessionStoreContext?.meta !== Meta.LOADING)) {
        return <Box sx={{
            display: 'flex',
            margin: 4,
            justifyContent: 'center'
        }}>
            <Button onClick={() => {
                window.location.href = import.meta.env.VITE_REDIRECT_KEYCLOAK_REDIRECT
            }} variant="contained">Попробуйте ещё раз <ReplayIcon sx={{ marginLeft: 1 }} />
            </Button>
        </Box>
    }

    return (
        <>
            <LinearProgress />
            <Box sx={{
                width: '100%',
                display: 'grid',
                justifyContent: 'center',
                paddingTop: 5
            }}><CircularProgress /></Box>
        </>
    )
})
