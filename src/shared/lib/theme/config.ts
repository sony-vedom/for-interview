import { createTheme } from '@mui/material/styles'

export const config = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
            xxl: 1700
        }
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#89cec4',
            dark: '#2A6D69'
        },
        secondary: {
            main: '#d5a693',
            light: '#ffffff'
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
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#2A6D69'
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                size: 'small'
            }
        },
    }
})
