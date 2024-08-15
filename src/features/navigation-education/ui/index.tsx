import { type FC, SyntheticEvent } from 'react'
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { navItemType } from 'shared/lib/navigation'
import { useGetNavigationPath } from '../lib'
import { ROUTES } from 'shared/config/routes'

export const NavigationEducation: FC<{
    navItems: navItemType[]
}> = (props) => {
    const { navItems } = props
    const navigate = useNavigate()
    const value = useGetNavigationPath(navItems)

    const handleChange = (_: SyntheticEvent, newValue: string) => {
        if (newValue === ROUTES.SPECIALIZED_EDUCATION) {
            navigate(`${newValue}/${ROUTES.ASNT}`)
            return
        }
        navigate(newValue)

    }

    return (
        <Box>
            <BottomNavigation
                showLabels
                onChange={handleChange}
                value={value}
                sx={(theme) => ({
                    gap: '5px',
                    height: { md: '100px' },
                    '& *': {
                        fontSize: {
                            xs: '0.75rem !important',
                            md: '1rem !important'
                        }
                    },
                    '& svg': {
                        fontSize: {
                            xs: '1.5rem !important',
                            md: '2rem !important'
                        }
                    },
                    '& .MuiBottomNavigationAction-root': {
                        border: `1px solid ${theme.palette.secondary.main}`,
                        borderRadius: '5px',
                        boxShadow: 2
                    },
                    '& .Mui-selected': {
                        color: `${theme.palette.secondary.main} !important`
                    }
                })}
            >
                {navItems.map((el) => (
                    <BottomNavigationAction key={el.path} value={el.path} label={el.displayName}
                                            icon={el.icon} />
                ))}
            </BottomNavigation>
        </Box>
    )
}