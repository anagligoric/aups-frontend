import { Client } from './Client'

export interface Job {
    id: number
    type: string
    description: string
    status: string
    client: Client
}
