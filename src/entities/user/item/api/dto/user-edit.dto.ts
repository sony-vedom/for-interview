import { UserDTO } from 'entities/user/item/api/dto/user.dto.ts'

export type EditUserDTO = Partial<Omit<UserDTO, "id">>
