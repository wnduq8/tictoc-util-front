import client from '../client'
import { CommonResponseType } from '@lib/type'
import { ReservationResult } from '@lib/api/reservation/getReservation'

export async function createReservation(params: CreateReservationParams) {
  const response = await client.post<CommonResponseType<CreateReservationResult>>('/reservation', params)
  return response.data
}

export interface CreateReservationParams {
  name: string
  reservationDate: string
  startTime: string
  endTime: string
  desc: string | null
  roomId: number
}

export interface CreateReservationResult extends Omit<ReservationResult, 'User' | 'Room'> {}
