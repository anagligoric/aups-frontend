import { Job } from './Job'
import { Location } from './Location'

export interface Client {
    id: number
    firstName: string
    surname : string
    phoneNumber : string
    locations: Location[]
    jobs: Job
}
