import { ROUTES } from 'shared/config/routes'
import { matchPath } from 'react-router-dom'
import { ParameterPipeFiltersParams } from 'entities/parameter/pipe/api/query/get-parameter-pipe.query.ts'

const LocalRouterConfig: Record<string, string> = {
    [ROUTES.SBT]: 'СБТ',
    [ROUTES.TBT]: 'ТБТ',
    [ROUTES.UBT]: 'УБТ'
}

export const getPipeTypeFromRouter = () => {
    return  Object.keys(LocalRouterConfig).find((el) => {
        return matchPath(`/${ROUTES.CREATE_REPORT}/${el}`, window.location.pathname)
    })
}

export const getFilters = () => {
    const currentPath = getPipeTypeFromRouter()
    if (!currentPath) return undefined
    return [{ key: 'pipe_type' as keyof ParameterPipeFiltersParams, value: LocalRouterConfig[currentPath] as string }]
}
