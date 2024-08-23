import { apiInstance } from 'shared/api'
import { User, mapUser, UserDTO } from 'entities/user/item/@x'
import { GetUserParam } from './query/get-user-param.ts'
import { UserEdit } from 'entities/user/item'
import { mapEditUser } from 'entities/user/item/api/mapper'
import { getPosition } from 'entities/position/@x'

const BASE_URL = '/user/'

export const getUsers = async (): Promise<User[]> => {
    const res = await apiInstance.get<UserDTO[]>(`${BASE_URL}`)
    const preparedUsersList = res.data.map(mapUser)
    return await Promise.all(preparedUsersList.map(async (el) => {
        if (el.position_id) {
            const resKind = await getPosition({ position_id: el.position_id })
            return {
                ...el,
                position_name: resKind.name
            }
        }
        return el
    }))
}

export const getUser = async (params: GetUserParam): Promise<User> => {
    const res = await apiInstance.get<UserDTO>(`${BASE_URL}${params.user_id}`)
    return {
        ...mapUser(res.data),
        role: null
    }
}

export const editUser = async (params: GetUserParam & UserEdit): Promise<User> => {
    const { user_id, ...rest } = params
    const res = await apiInstance.patch<UserDTO>(`${BASE_URL}${user_id}`, mapEditUser(rest))
    return {
        ...mapUser(res.data),
        role: null
    }
}