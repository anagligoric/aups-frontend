import { DocumentSparePart } from './DocumentSparePart'

export interface SparePart {
    id: number
    name: string
    documentSpareParts: DocumentSparePart[]
}
