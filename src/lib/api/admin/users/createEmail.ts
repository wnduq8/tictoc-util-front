import client from '../../client'
import { CommonResponseType } from '@lib/type'

export async function createEmail(params: EmailAuthParams) {
  const response = await client.post<CommonResponseType<null>>('/users/admin/signup/email', params)
  return response.data
}

interface EmailAuthParams {
  email: string
  password: string
  department: string
  name: string
}
