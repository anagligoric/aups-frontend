import axios from 'axios'
import { authHeader } from './AuthService'
import { Client } from '../models/Client'
import { Job } from '../models/Job'

export function createJob (type: string, description: string, client: Client) {
  return axios
    .post('http://localhost:8081/api/job', {
      type,
      description,
      client
    } as Job, { headers: { Authorization: authHeader() } })
}

export function getAllJobs () {
  return axios.get('http://localhost:8081/api/job')
}

export function getJobsById (id: string) {
  return axios.get(`http://localhost:8081/api/job/${id}`)
}

export function updateJob (id: number, job: Job) {
  return axios
    .put(`http://localhost:8081/api/job/${id}`, job,
      { headers: { Authorization: authHeader() } })
}

export function deleteJobById (id: number) {
  return axios.delete(`http://localhost:8081/api/job/${id}`, { headers: { Authorization: authHeader() } })
}
