import client from '../../client'
import { CommonResponseType } from '@lib/type'
import { ReservationByUserResult } from '@lib/api/reservation/getReservationByUser'

export async function getAdminUsers(offset: number, limit: number) {
  const response = await client.get<CommonResponseType<ReservationByUserResult>>('/users/admin/users', {
    params: { offset, limit },
  })
  return response.data
}
