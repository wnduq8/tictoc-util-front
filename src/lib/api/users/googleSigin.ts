import client from '../client'

export async function googleSignin(credential: string) {
  const response = await client.post<any>('/users/signin/google', {
    credential,
  })
  return response.data.data
}
