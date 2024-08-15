import { TokenDTO } from 'entities/session/api/dto'
import { Token } from 'entities/session/model/token.ts'

export const mapToken = (dto: TokenDTO): Token => ({
    access: dto.access,
    token_type: dto.token_type
})
