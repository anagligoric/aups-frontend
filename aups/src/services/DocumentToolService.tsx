import axios from 'axios'
import { Tool } from '../models/Tool'
import { Document } from '../models/Document'

import { authHeader } from './service'

export function getAllDocumentTool () {
  return axios.get('http://localhost:8081/api/document/tool')
}

export function getDocumentToolById (id: string) {
  return axios.get(`http://localhost:8081/api/document/tool/${id}`)
}

export function updateDocumentTool (id: string, amount: number, tool: Tool, document: Document) {
  return axios
    .put(`http://localhost:8081/api/document/tool/${id}`, {
      id,
      amount,
      tool,
      document
    }, { headers: { Authorization: authHeader() } })
}

export function deleteDocumentTool (id: string) {
  return axios.delete(`http://localhost:8081/api/document/tool/${id}`, { headers: { Authorization: authHeader() } })
}
