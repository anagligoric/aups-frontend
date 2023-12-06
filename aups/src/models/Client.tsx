/* eslint-disable */
import { Job } from './Job'

export interface Client {
    id: number
    firstName: string
    surname : string
    phoneNumber : string
	city: string
	street: string
	number: string
    jobs: Job
}
