import { type UserEdit } from 'entities/user/item'
import { type EditUserDTO } from 'entities/user/item/api/dto/user-edit.dto.ts'

export const mapEditUser = (model: UserEdit): EditUserDTO => ({
    loggin: model.login,
    first_name: model.first_name,
    last_name: model.last_name,
    patronymic: model.second_name,
    position_id: model.position_id,
})
