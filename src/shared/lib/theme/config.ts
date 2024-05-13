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
            variants: [
                {
                    props: { variant: 'contained' },
                    style: {
                        '&:hover': {
                            color: '#fff'
                        }
                    }
                }
            ],
            styleOverrides: {
                root: {
                    '&.Mui-selected': {},
                    '&.Mui-focusVisible': {
                        outline: 'none !important'
                    },
                    '&:focus': {
                        outline: 'none !important'
                    }
                },
                sizeMedium: {
                    fontSize: 'clamp(0.688rem, 0.619rem + 0.455vw, 0.875rem)'
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
                    '&:focus': {
                        outline: 'none !important'
                    }
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                size: 'small'
            }
        }
    }
})
