import client from '../../client'
import { CommonResponseType } from '@lib/type'
import { CommonResult } from '@lib/api/type'

export async function getAdminUsers(offset: number, limit: number) {
  const response = await client.get<CommonResponseType<UsersResult>>('/users/admin/users', {
    params: { offset, limit },
  })
  return response.data
}

export interface UsersResult extends CommonResult {
  totalCount: number
  data: IUser[]
}

export interface IUser {
  createAt: string
  deletedAt: string | null
  department: string
  email: string
  id: string
  isAdmin: boolean
  isGoogle: boolean
  name: string
  phone: null | string
  profileImage: string
  status: 'A' | 'N'
}
