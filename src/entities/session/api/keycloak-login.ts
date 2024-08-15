import { apiInstance } from 'shared/api'
import { TokenDTO } from './dto'
import { Token } from 'entities/session/model/token.ts'
import { mapToken } from 'entities/session/api/mapper/map-token.ts'

const BASE_URL = '/keycloak/'

export const keycloakLogin = async ({ code }: { code: string }): Promise<Token> => {
    const res = await apiInstance.get<TokenDTO>(`${BASE_URL}keycloak_callback`, {
        params: {
            code
        }
    })
    return mapToken(res.data)
}
