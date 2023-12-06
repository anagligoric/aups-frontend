import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Token from '../models/Token'
import { User } from '../models/User'

export function login (email: string, password: string) {
  return axios
    .post('http://localhost:8081/api/auth/login', {
      email,
      password
    })
    .then((response: { data: { token: string } }) => {
      if (response.data.token) {
        const oldTokenValue = localStorage.getItem('token')
        const oldRoleValue = localStorage.getItem('roles')
        const decoded: Token = jwtDecode<Token>(response.data.token)
        const newTokenValue = JSON.stringify(response.data)
        const newRoleValue = JSON.stringify(decoded.role)
        localStorage.setItem('token', newTokenValue)
        localStorage.setItem('roles', newRoleValue)

        const tokenEvent = new StorageEvent('storage', {
          key: 'token',
          oldValue: oldTokenValue,
          newValue: newTokenValue
        })
        const roleEvent = new StorageEvent('storage', {
          key: 'role',
          oldValue: oldRoleValue,
          newValue: newRoleValue
        })
        window.dispatchEvent(tokenEvent)
        window.dispatchEvent(roleEvent)
      }
    })
}

export function register (user: User) {
  return axios
    .post('http://localhost:8081/api/auth/registeruser', {
      firstName: user.firstName,
      surname: user.surname,
      email: user.email,
      role: user.role,
      password: user.password
    })
    .then((response: { data: { token: string } }) => {
      if (response.data.token) {
        const decoded: Token = jwtDecode<Token>(response.data.token)
        localStorage.setItem('token', JSON.stringify(response.data))
        localStorage.setItem('roles', JSON.stringify(decoded.role))
      }
    })
}

export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('token') || '{}')
  if (user && user.token) {
    return 'Bearer ' + user.token
  } else return ''
}

export const logout = () => {
  const oldTokenValue = localStorage.getItem('token')
  const oldRoleValue = localStorage.getItem('roles')
  localStorage.removeItem('roles')
  localStorage.removeItem('token')
  const tokenEvent = new StorageEvent('storage', {
    key: 'token',
    oldValue: oldTokenValue,
    newValue: ''
  })
  const roleEvent = new StorageEvent('storage', {
    key: 'roles',
    oldValue: oldRoleValue,
    newValue: ''
  })
  window.dispatchEvent(tokenEvent)
  window.dispatchEvent(roleEvent)
}

export const getToken = () => {
  const token = localStorage.getItem('token')
  return token ? JSON.parse(token) : ''
}

export const getRole = () => {
  const role = localStorage.getItem('roles')
  return role ? JSON.parse(role) : ''
}
