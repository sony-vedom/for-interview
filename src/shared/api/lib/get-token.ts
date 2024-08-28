import { ACCESS } from 'shared/config/api'

export const getToken = (): string | null => {
    return localStorage.getItem(ACCESS)
}
