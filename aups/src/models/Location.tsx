import { Client } from './Client'

export interface Location {
    id: number
    city: string
    street: string
    number: number
    client: Client
}
