import axios from 'axios'
import { authHeader } from './AuthService'
import { UserDto } from '../models/User'
import { ResetPassword } from '../models/ResetPassword'
axios.defaults.headers.common.Authorization = authHeader()

export function createUser (firstName: string, surname: string, email: string, roleId : number) {
  return axios
    .post('http://localhost:8081/api/user', {
      firstName,
      surname,
      email,
      roleId
    } as UserDto, { headers: { Authorization: authHeader(), 'Content-Type': 'application/json' } })
}

export function getAllUser () {
  return axios.get('http://localhost:8081/api/user', { headers: { Authorization: authHeader() } })
}

export function getAllRoles () {
  return axios.get('http://localhost:8081/roles', { headers: { Authorization: authHeader() } })
}

export function getUserById (id: string) {
  return axios.get(`http://localhost:8081/api/user/${id}`, { headers: { Authorization: authHeader() } })
}

export function updateUser (id: number, user: UserDto) {
  return axios
    .put(`http://localhost:8081/api/user/${id}`, user,
      { headers: { Authorization: authHeader() } })
}

export function resetPassword (resetPassword: ResetPassword) {
  return axios
    .put('http://localhost:8081/api/user/reset-password', resetPassword,
      { headers: { Authorization: authHeader() } })
}

export function deleteUserById (id: number) {
  return axios.delete(`http://localhost:8081/api/user/${id}`, { headers: { Authorization: authHeader() } })
}

export function mapRoleName (roleName: string) {
  const parts = roleName.split('_')
  if (parts.length > 1) {
    parts.shift()
    return parts.join('_')
  }
  return roleName
}
