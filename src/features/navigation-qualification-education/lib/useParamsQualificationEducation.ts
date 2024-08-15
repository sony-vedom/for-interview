import { matchPath, useLocation, useNavigate } from 'react-router-dom'
import { MouseEvent, useEffect } from 'react'
import { KIND_QUALIFICATION_EDUCATION } from 'entities/qualification-education/kind'
import { ROUTES, ROUTES_PARAMS } from 'shared/config/routes'

export const useGetNavigationPath = (navItems: { path: string }[]) => {
    const location = useLocation()
    return navItems.find((el) => {
        return matchPath(`/${ROUTES.USERS}/:${ROUTES_PARAMS.userId}/${ROUTES.SPECIALIZED_EDUCATION}/${el.path}`, location.pathname) ||
            matchPath(`/${ROUTES.PROFILE}/${ROUTES.SPECIALIZED_EDUCATION}/${el.path}`, location.pathname)
    })?.path
}

export const useParamsQualificationEducation = () => {
    const navigate = useNavigate()

    const value = useGetNavigationPath([
        {
            path: ROUTES.ASNT
        },
        {
            path: ROUTES.SDANK
        }
    ])

    const handleAlignment = (
        _: MouseEvent<HTMLElement>,
        newAlignment: KIND_QUALIFICATION_EDUCATION | null
    ) => {
        if (newAlignment) {
            navigate(newAlignment)
        }
    }

    useEffect(() => {
        navigate(ROUTES.ASNT)
    }, [])

    return {
        value,
        onChange: handleAlignment
    }
}