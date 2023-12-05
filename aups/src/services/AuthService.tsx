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
        const decoded: Token = jwtDecode<Token>(response.data.token)
        localStorage.setItem('token', JSON.stringify(response.data))
        localStorage.setItem('roles', JSON.stringify(decoded.role))
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
        console.log(response.data.token)
        console.log('token ' + JSON.stringify(response.data))
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
  localStorage.removeItem('roles')
  localStorage.removeItem('token')
}
export const getToken = () => {
  const token = localStorage.getItem('token')
  return token ? JSON.parse(token) : ''
}
