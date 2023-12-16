import { Role } from './Role'

export interface User {
  id: number
  firstName: string
  surname: string
  password: string
  email: string
  role: Role
}

export interface UserDto {
  id?: number;
  firstName: string
  surname: string
  email: string
  roleId: number
}
