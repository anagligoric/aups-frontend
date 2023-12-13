import { Role } from './Role'

export interface User {
	id:number
    firstName: string
    surname: string
    password: string
    email: string
    role: Role
  }
