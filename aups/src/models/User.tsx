import { Role } from './Role'

export interface User {
    firstName: string
    surname: string
    password: string
    email: string
    role: Role
  }
