import client from '../client'
import { CommonResponseType } from '@lib/type'
import { CommonResult } from '@lib/api/type'
import { UserResult } from '@lib/api/users/user'
import { RoomsResult } from '@lib/api/rooms/getRooms'

export async function getReservation(data: ReservationParams) {
  const response = await client.post<CommonResponseType<ReservationResult[]>>('/reservation/date', data)

  return response.data
}

export interface ReservationParams {
  date: string
}

export interface ReservationResult extends CommonResult {
  name: string
  desc?: string
  reservationDate: string
  startTime: string
  endTime: string
  userId: string
  roomId: string
  User: UserResult
  Room: RoomsResult
}
