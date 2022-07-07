import axios from 'axios'
import { authHeader } from './service'

export function getAllAlat () {
  return axios.get('http://localhost:8081/api/tool')
}

export function getAlatById (id: string) {
  return axios.get(`http://localhost:8081/api/tool/${id}`)
}

export function updateAlat (id: string, name: string) {
  return axios
    .put(`http://localhost:8081/api/tool/${id}`, {
      id,
      name
    }, { headers: { Authorization: authHeader() } })
}

export function deleteAlatById (id: string) {
  return axios.delete(`http://localhost:8081/api/alat/${id}`, { headers: { Authorization: authHeader() } })
}
