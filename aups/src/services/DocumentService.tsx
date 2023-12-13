/* eslint-disable */
import axios from 'axios'
import { authHeader } from './AuthService'
import { Document } from '../models/Document'
import { Job } from '../models/Job'

export function createDocument(number: string, creationDate: Date, price: number, job: Job) {
  return axios
    .post('http://localhost:8081/api/document', {
		number, 
		creationDate,
		price, 
		job
    } as Document, { headers: { Authorization: authHeader() } })
}

export function getAllDocuments() {
  return axios.get('http://localhost:8081/api/document')
}

export function getDocumentById(id: string) {
  return axios.get(`http://localhost:8081/api/document/${id}`)
}

export function updateDocument(id: number, document: Document) {
	return axios
    .put(`http://localhost:8081/api/document/${id}`, document,
      { headers: { Authorization: authHeader() } })
}

export function deleteDocumentById(id: number) {
  return axios.delete(`http://localhost:8081/document/document/${id}`, { headers: { Authorization: authHeader() } })
}

  