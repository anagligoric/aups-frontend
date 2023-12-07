/* eslint-disable */
import axios from 'axios'
import { authHeader } from './AuthService'
import { Role } from '../models/Role'
import { User } from '../models/User'

export function createUser(firstName: string, surname: string, email: string, role : Role, password: string) {
  return axios
    .post('http://localhost:8081/api/user', {
      firstName,
      surname,
      email,
      password,
      role,
    }, { headers: { Authorization: authHeader() } })
}

export function getAllUser() {
  return axios.get('http://localhost:8081/api/user/technicians')
}

export function getUserById(id: string) {
  return axios.get(`http://localhost:8081/api/user/${id}`)
}

export function updateUser(user: User) {
  return axios
    .put(`http://localhost:8081/api/user/${user.id}`, user,
      { headers: { Authorization: authHeader() } })
}

export function deleteUserById(id: number) {
  return axios.delete(`http://localhost:8081/api/user/${id}`, { headers: { Authorization: authHeader() } })
}
