import { apiInstance } from 'shared/api'
import { User, mapUser, UserDTO } from 'entities/user/item/@x'
import { ROUTES } from 'shared/config/routes'

const BASE_URL = '/user_me/'

export const getUserMe = async (): Promise<User> => {
    const res = await apiInstance.get<UserDTO>(`${BASE_URL}`)
    return {
        ...mapUser(res.data),
        // TODO: убрать эту фигню потом
        role: {
            id: 5,
            name: 'Дефектоскопист',
            edit: [
                {
                    id: 1,
                    pathName: 'documents'
                },
                {
                    id: 2,
                    pathName: ROUTES.TOOLS,
                },
                {
                    id: 3,
                    pathName: 'create-report'
                },
                {
                    id: 4,
                    pathName: 'users'
                },
                {
                    id: 5,
                    pathName: ROUTES.MEDICAL_EXAMINATION,
                },
                {
                    id: 6,
                    pathName: ROUTES.NON_SPECIALIZED_EDUCATION,
                },
                {
                    id: 7,
                    pathName: ROUTES.SPECIALIZED_EDUCATION,
                },
                {
                    id: 7,
                    pathName: ROUTES.CONSUMERS,
                },
                {
                    id: 8,
                    pathName: ROUTES.DIRECTORY,
                }
            ],
            read: [
                {
                    id: 1,
                    pathName: 'documents'
                },
                {
                    id: 2,
                    pathName: ROUTES.TOOLS,
                },
                {
                    id: 3,
                    pathName: 'create-report'
                },
                {
                    id: 4,
                    pathName: 'users'
                },
                {
                    id: 5,
                    pathName: ROUTES.MEDICAL_EXAMINATION,
                },
                {
                    id: 6,
                    pathName: ROUTES.NON_SPECIALIZED_EDUCATION,
                },
                {
                    id: 7,
                    pathName: ROUTES.SPECIALIZED_EDUCATION,
                },
                {
                    id: 7,
                    pathName: ROUTES.CONSUMERS,
                },
                {
                    id: 8,
                    pathName: ROUTES.DIRECTORY,
                }
            ]
        }
    }
}
