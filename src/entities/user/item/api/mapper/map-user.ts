import { UserDTO } from 'entities/user/item/api/dto'
import { User } from 'entities/user/item'

export const mapUser = (dto: UserDTO): User => ({
    id: dto.id,
    login: dto.loggin,

    first_name: dto.first_name,
    last_name: dto.last_name,
    second_name: dto.patronymic,

    position_id: dto.position_id,

    // TODO: переделать на нормальное, когда роли появятся
    role: null,
    is_superuser: true
})
