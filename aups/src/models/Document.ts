import { Job } from './Job'
import { Tool } from './Tool'
import { Vehicle } from './Vehicle'

export interface Document {
    id?: number
    number: string
    creationDate : Date
    price : number
    job: Job
    vehicle: Vehicle
    tools: Tool[]
}
