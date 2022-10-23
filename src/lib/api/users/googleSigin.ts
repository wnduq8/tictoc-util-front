import client from '../client'
import { CommonResponseType } from '@lib/type'
import { AuthResult } from '@lib/api/users/emailSigin'

export async function googleSignin(credential: string) {
  const response = await client.post<CommonResponseType<AuthResult>>('/users/signin/google', {
    credential,
  })
  return response.data
}
