/* eslint-disable no-unused-vars */
import { Client } from './Client'
import { UserDto } from './User'

export interface Job {
    id: number
    type: string
    description: string
    status: string
    client: Client
    user: UserDto
}

export enum JobStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export interface JobDto {
    id: number
    type: string
    description: string
    status: JobStatus
    clientId: number
    userId: number
}
