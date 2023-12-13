import axios from 'axios'
import { authHeader } from './AuthService'
import { Client } from '../models/Client'

export function createClient (firstName: string, surname: string, phoneNumber: string, city: string, street: string, number: string) {
  return axios
    .post('http://localhost:8081/api/client', {
      firstName,
      surname,
      phoneNumber,
      city,
      street,
      number

    }, { headers: { Authorization: authHeader() } })
}

export function getAllClient () {
  return axios.get('http://localhost:8081/api/client')
}

export function getClientById (id: string) {
  return axios.get(`http://localhost:8081/api/client/${id}`)
}

export function updateClient (client: Client) {
  return axios
    .put(`http://localhost:8081/api/client/${client.id}`, client,
      { headers: { Authorization: authHeader() } })
}

export function deleteClientById (id: number) {
  return axios.delete(`http://localhost:8081/api/client/${id}`, { headers: { Authorization: authHeader() } })
}
