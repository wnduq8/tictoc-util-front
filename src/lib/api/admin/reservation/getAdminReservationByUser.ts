import client from '../../client'
import { CommonResponseType } from '@lib/type'
import { ReservationResult } from '@lib/api/reservation/getReservation'

export async function getAdminReservationByUser(userId: number, offset: number, limit: number) {
  const response = await client.get<CommonResponseType<IAdminReservationByUser[]>>(
    `/reservation/admin/user/reservation/${userId}`,
    {
      params: { offset, limit },
    },
  )
  return response.data
}

export interface IAdminReservationByUser extends Omit<ReservationResult, 'User'> {}
