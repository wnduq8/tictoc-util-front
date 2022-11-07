import client from '../client'
import { CommonResponseType } from '@lib/type'
import { CommonResult } from '@lib/api/type'
import { ReservationResult } from '@lib/api/reservation/getReservation'

export async function getReservationByUser(offset: number, limit: number) {
  const response = await client.get<CommonResponseType<ReservationByUserResult>>('/reservation/user', {
    params: { offset, limit },
  })

  return response.data
}

export interface ReservationByUserResult extends CommonResult {
  totalCount: number
  data: {
    id: string
    email: string
    name: string
    department: string
    status: 'A' | 'N'
    Reservations: Omit<ReservationResult, 'User' | 'Room'>[]
  }
}
