import axios from 'axios'
import { authHeader } from './AuthService'

export function getAllLocation () {
  return axios.get('http://localhost:8081/api/location')
}

export function getLocationById (id: string) {
  return axios.get(`http://localhost:8081/api/location/${id}`)
}

export function updateLocation (id: string, city: string, street:string, number:number) {
  return axios
    .put(`http://localhost:8081/api/location/${id}`, {
      id,
      city,
      street,
      number
    }, { headers: { Authorization: authHeader() } })
}

export function deleteLocationById (id: number) {
  return axios.delete(`http://localhost:8081/api/location/${id}`, { headers: { Authorization: authHeader() } })
}
