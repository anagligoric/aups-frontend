import { Job } from './Job'
import { User } from './User'

export interface Team {
    id: number
    name: string
    description: string
    workingHours: string
    technicians: User[]
    jobs: Job[]
}
