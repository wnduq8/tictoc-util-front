import client from '../client'
import { CommonResponseType } from '@lib/type'

export async function createAdditionalInfo(params: CreateAdditionalParams) {
  const response = await client.post<CommonResponseType<null>>('/users/signup/additional-info', params)
  return response.data
}

export interface CreateAdditionalParams {
  id: number
  name: string
  department: string
  phone?: string
}
