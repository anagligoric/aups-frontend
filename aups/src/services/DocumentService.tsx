import axios from 'axios'
import { authHeader } from './AuthService'
import { Document } from '../models/Document'

export function createDocument (document: Document) {
  return axios
    .post('http://localhost:8081/api/document', document, { headers: { Authorization: authHeader() } })
}

export function getAllDocuments () {
  return axios.get('http://localhost:8081/api/document')
}

export function getMyDocuments (email: string) {
  return axios.get(`http://localhost:8081/api/document/my/${email}`)
}

export function getDocumentById (id: string) {
  return axios.get(`http://localhost:8081/api/document/${id}`)
}

export function updateDocument (id: number, document: Document) {
  return axios
    .put(`http://localhost:8081/api/document/${id}`, document,
      { headers: { Authorization: authHeader() } })
}

export function deleteDocumentById (id: number) {
  return axios.delete(`http://localhost:8081/document/document/${id}`, { headers: { Authorization: authHeader() } })
}
