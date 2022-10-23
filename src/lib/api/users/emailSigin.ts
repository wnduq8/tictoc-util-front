import client from '../client'
import { CommonResponseType } from '@lib/type'

export async function emailSignin(params: AuthParams) {
  const response = await client.post<CommonResponseType<AuthResult>>('/users/signin/email', params)
  return response.data
}

interface AuthParams {
  email: string
  password: string
  isGoogle: boolean
}

export interface AuthResult {
  token: string
}
