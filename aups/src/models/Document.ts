import { Job } from './Job'

export interface Document {
    id: number
    number: string
    creationDate : Date
    price : number
    job: Job
}
