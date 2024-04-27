import { createTheme } from '@mui/material/styles'

export const config = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#89cec4',
            dark: '#2A6D69'
        },
        secondary: {
            main: '#de547b'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {},
                    '&.Mui-focusVisible': {
                        outline: 'none !important'
                    },
                    ':focus': {
                        outline: 'none !important'
                    }
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {},
                    '&.Mui-focusVisible': {
                        outline: 'none !important'
                    },
                    ':focus': {
                        outline: 'none !important'
                    }
                }
            }
        }
    }
})
