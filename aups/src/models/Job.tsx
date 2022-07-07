import { Client } from './Client'
import { Document } from './Document'

export interface Job {
    id: number
    type: string
    description: string
    team: string
    client: Client[]
    document: Document[]
}
