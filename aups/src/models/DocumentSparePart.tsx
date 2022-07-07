import { SparePart } from './SparePart'
import { Document } from './Document'

export interface DocumentSparePart {
    id: number
    amount: number
    sparePart : SparePart
    document : Document
}
