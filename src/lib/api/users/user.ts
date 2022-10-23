import client from '../client'

export async function getUserInfo() {
  const response = await client.get<any>('/users/user')
  return response.data
}
