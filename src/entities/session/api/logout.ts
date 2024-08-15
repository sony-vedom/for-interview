import { Token } from 'entities/session/model/token.ts'
import { apiInstance } from 'shared/api'
import { TokenDTO } from 'entities/session/api/dto'
import { mapToken } from 'entities/session/api/mapper/map-token.ts'

const BASE_URL = "/jwt/"

export const logout = async (): Promise<Token> => {
    const res = await apiInstance.get<TokenDTO>(`${BASE_URL}logout`)
    return mapToken(res.data)
}
