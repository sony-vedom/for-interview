import { apiInstance } from 'shared/api'
import { User, mapUser, UserDTO } from 'entities/user/item/@x'
import { GetUserParam } from './query/get-user-param.ts'
import { UserEdit } from 'entities/user/item'
import { mapEditUser } from 'entities/user/item/api/mapper'

const BASE_URL = '/user/'



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