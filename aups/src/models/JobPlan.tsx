import { Document } from './Document'

export interface JobPlan {
    id: number
    startTime: Date
    endTime : Date
    document: Document
}
