import { getAuthHeaders } from './auth'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

export async function getDashboardStats() {
  const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
    headers: getAuthHeaders()
  })
  const data = await response.json()
  return data.success ? data.data : { totalEquipment: 0, activeEquipment: 0, totalFaults: 0, pendingMaintenance: 0 }
}

export async function getEquipmentStatus() {
  const response = await fetch(`${API_BASE_URL}/dashboard/equipment-status`, {
    headers: getAuthHeaders()
  })
  const data = await response.json()
  return data.success ? data.data : []
}

export async function getRecentFaults() {
  const response = await fetch(`${API_BASE_URL}/dashboard/recent-faults`, {
    headers: getAuthHeaders()
  })
  const data = await response.json()
  return data.success ? data.data : []
}

export async function getMaintenanceSchedule() {
  const response = await fetch(`${API_BASE_URL}/dashboard/maintenance-schedule`, {
    headers: getAuthHeaders()
  })
  const data = await response.json()
  return data.success ? data.data : []
}

export async function getEquipmentList(params: any = {}) {
  const queryString = new URLSearchParams(params).toString()
  const response = await fetch(`${API_BASE_URL}/equipment?${queryString}`, {
    headers: getAuthHeaders()
  })
  const data = await response.json()
  return data
}

export async function createEquipment(data: any) {
  const response = await fetch(`${API_BASE_URL}/equipment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(data)
  })
  return await response.json()
}

export async function updateEquipment(id: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/equipment/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(data)
  })
  return await response.json()
}

export async function deleteEquipment(id: string) {
  const response = await fetch(`${API_BASE_URL}/equipment/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  return await response.json()
}