/* eslint-disable */
import axios from 'axios'
import { authHeader } from './AuthService'
import { Vehicle } from '../models/Vehicle'

export function createVehicle(name: string, licencePlate: string, type: string) {
  return axios
    .post('http://localhost:8081/api/vehicle', {
      name,
      licencePlate,
      type
    }, { headers: { Authorization: authHeader() } })
}

export function getAllVehicles() {
  return axios.get('http://localhost:8081/api/vehicle')
}

export function getVehicleById(id: string) {
  return axios.get(`http://localhost:8081/api/vehicle/${id}`)
}

export function updateVehicle(vehicle: Vehicle) {
  return axios
    .put(`http://localhost:8081/api/vehicle/${vehicle.id}`, vehicle,
      { headers: { Authorization: authHeader() } })
}

export function deleteVehicleById(id: number) {
  return axios.delete(`http://localhost:8081/api/vehicle/${id}`, { headers: { Authorization: authHeader() } })
}
