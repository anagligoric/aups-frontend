import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Token from '../models/Token'

export function login (email: string, password: string) {
  return axios
    .post('http://localhost:8081/api/auth/login', {
      email,
      password
    })
    .then((response: { data: { token: string } }) => {
      if (response.data.token) {
        const decoded: Token = jwtDecode<Token>(response.data.token)
        const newTokenValue = JSON.stringify(response.data)
        const newRoleValue = JSON.stringify(decoded.role)
        const newNameValue = JSON.stringify(decoded.firstName)
        const newSurnameValue = JSON.stringify(decoded.surname)
        const newUsernameValue = JSON.stringify(decoded.email)

        localStorage.setItem('token', newTokenValue)
        localStorage.setItem('roles', newRoleValue)
        localStorage.setItem('firstName', newNameValue)
        localStorage.setItem('surname', newSurnameValue)
        localStorage.setItem('email', newUsernameValue)

        emitEvents(
          newTokenValue,
          newRoleValue,
          newNameValue,
          newSurnameValue,
          newUsernameValue)
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
  localStorage.removeItem('firstName')
  localStorage.removeItem('surname')
  localStorage.removeItem('email')

  emitEvents('', '', '', '', '')
}

export const getToken = () => {
  const token = localStorage.getItem('token')
  return token ? JSON.parse(token) : ''
}

export const getRole = () => {
  const role = localStorage.getItem('roles')
  return role ? JSON.parse(role) : ''
}

export const getCurrentUser = () => {
  const firstName = localStorage.getItem('firstName')
  const lastName = localStorage.getItem('surname')

  return firstName && lastName ? `${JSON.parse(firstName)} ${JSON.parse(lastName)}` : ''
}

export const getCurrentUserUsername = () => {
  const username = localStorage.getItem('email')
  return username ? JSON.parse(username) : ''
}

function emitEvents (newTokenValue: string, newRoleValue: string, newNameValue: string, newSurnameValue: string, newUsernameValue: string) {
  const oldTokenValue = localStorage.getItem('token')
  const oldRoleValue = localStorage.getItem('roles')
  const oldNameValue = localStorage.getItem('firstName')
  const oldSurnameValue = localStorage.getItem('surname')
  const oldUsernameValue = localStorage.getItem('email')

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
  const nameEvent = new StorageEvent('storage', {
    key: 'firstName',
    oldValue: oldNameValue,
    newValue: newNameValue
  })
  const surnameEvent = new StorageEvent('storage', {
    key: 'surname',
    oldValue: oldSurnameValue,
    newValue: newSurnameValue
  })
  const usernameEvent = new StorageEvent('storage', {
    key: 'email',
    oldValue: oldUsernameValue,
    newValue: newUsernameValue
  })
  window.dispatchEvent(tokenEvent)
  window.dispatchEvent(roleEvent)
  window.dispatchEvent(nameEvent)
  window.dispatchEvent(surnameEvent)
  window.dispatchEvent(usernameEvent)
}
