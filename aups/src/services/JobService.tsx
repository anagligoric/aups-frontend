import axios from 'axios'
import { authHeader } from './AuthService'
import { JobDto, JobStatus } from '../models/Job'

export function createJob (jobDto: JobDto) {
  return axios
    .post('http://localhost:8081/api/job', jobDto, { headers: { Authorization: authHeader() } })
}

export function getAllJobs () {
  return axios.get('http://localhost:8081/api/job')
}

export function getMyJobs (email: string) {
  return axios.get(`http://localhost:8081/api/job/my/${email}`)
}

export function getJobsById (id: string) {
  return axios.get(`http://localhost:8081/api/job/${id}`)
}

export function updateJob (id: number, job: JobDto) {
  return axios
    .put(`http://localhost:8081/api/job/${id}`, job,
      { headers: { Authorization: authHeader() } })
}

export function updateStatus (id: number, jobStatus: JobStatus) {
  return axios
    .put(`http://localhost:8081/api/job/update-status/${id}?jobStatus=${jobStatus}`,
      { headers: { Authorization: authHeader() } })
}

export function deleteJobById (id: number) {
  return axios.delete(`http://localhost:8081/api/job/${id}`, { headers: { Authorization: authHeader() } })
}
