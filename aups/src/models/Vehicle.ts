import { Document } from './Document'

export interface Vehicle {
    id: number
    name: string
    status: string
    type: string
    document: Document
}
