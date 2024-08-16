import { createSearchParams, useSearchParams } from 'react-router-dom'

export const setSearchParam = <T extends Record<string, string>>(searchParams: T) => {
    const urlSearchParams = new URLSearchParams(searchParams)
    window.history.replaceState({}, 'Title', `${window.location.pathname}?${urlSearchParams.toString()}`)
}

export const useAppSearchParam = <T extends Record<string, string>>(searchParams: T) => {
    const [URLSearchParams, setUrlSearchParams] = useSearchParams()
    return {
        URLSearchParams,
        handleSetURLSearchParams: () => {
            setUrlSearchParams(searchParams)
        }
    }
}

export const createSearchParamsApp = <T extends Record<string, string>>(params: T) => {
    return createSearchParams(params)
}
