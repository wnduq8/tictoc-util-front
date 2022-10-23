import client from '../client'
import { CommonResponseType } from '@lib/type'

export async function getUserInfo() {
  const response = await client.get<CommonResponseType<UserResult>>('/users/user')

  return response.data
}

export interface UserResult {
  id: number
  createAt: string
  updatedAt?: string
  deletedAt?: string
  email: string
  name: string
  phone?: string
  department?: string
  profileImage?: string
  isGoogle: boolean
  isAdmin: boolean
  status: 'A' | 'N'
}
