import axios from 'axios'
import { authHeader } from './AuthService'
import { Tool } from '../models/Tool'

export function createTool (name: string) {
  return axios
    .post('http://localhost:8081/api/tool', {
      name
    }, { headers: { Authorization: authHeader() } })
}

export function getAllTools () {
  return axios.get('http://localhost:8081/api/tool')
}

export function getToolById (id: string) {
  return axios.get(`http://localhost:8081/api/tool/${id}`)
}

export function updateTool (tool: Tool) {
  return axios
    .put(`http://localhost:8081/api/tool/${tool.id}`, tool,
      { headers: { Authorization: authHeader() } })
}
export function deleteToolById (id: number) {
  return axios.delete(`http://localhost:8081/api/tool/${id}`, { headers: { Authorization: authHeader() } })
}
