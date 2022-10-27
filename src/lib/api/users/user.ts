import client from '../client'
import { CommonResponseType } from '@lib/type'
import { CommonResult } from '@lib/api/type'

export async function getUserInfo() {
  const response = await client.get<CommonResponseType<UserResult>>('/users/user')

  return response.data
}

export interface UserResult extends CommonResult {
  email: string
  name: string
  phone?: string
  department?: string
  profileImage?: string
  isGoogle: boolean
  isAdmin: boolean
  status: 'A' | 'N'
}
