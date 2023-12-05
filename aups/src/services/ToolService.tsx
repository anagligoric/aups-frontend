import axios from 'axios'
import { authHeader } from './AuthService'

export function getAllTools () {
  return axios.get('http://localhost:8081/api/tool')
}

export function getToolById (id: string) {
  return axios.get(`http://localhost:8081/api/tool/${id}`)
}

export function updateTool (id: string, name: string) {
  return axios
    .put(`http://localhost:8081/api/tool/${id}`, {
      id,
      name
    }, { headers: { Authorization: authHeader() } })
}

export function deleteToolById (id: number) {
  return axios.delete(`http://localhost:8081/api/tool/${id}`, { headers: { Authorization: authHeader() } })
}
