import { Role } from './Role'

export interface User {
    ime: string
    prezime: string
    lozinka: string
    email: string
    role: Role
  }
