import { Tool } from './Tool'
import { Document } from './Document'

export interface DocumentTool {
    id: number
    amount: number
    tool : Tool
    document: Document
}
