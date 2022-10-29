import client from '../client'
import { CommonResponseType } from '@lib/type'

export async function deleteReservation(id: number) {
  const response = await client.delete<CommonResponseType<undefined>>(`/reservation/${id}`)
  return response.data
}
