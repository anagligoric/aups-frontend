import { Job } from './Job'
import { JobPlan } from './JobPlan'
import { Vehicle } from './Vehicle'
import { DocumentSparePart } from './DocumentSparePart'
import { DocumentTool } from './DocumentTool'

export interface Document {
    id: number
    amount: number
    creationDate : Date
    price : number
    job: Job
    jobPlan: JobPlan
    vehicles: Vehicle[]
    documentSpareParts: DocumentSparePart[]
    documentTools: DocumentTool[]
}
