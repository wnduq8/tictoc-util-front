import client from '../../client'
import { CommonResponseType } from '@lib/type'

export async function createRoom(params: CreateRoomParams) {
  const response = await client.post<CommonResponseType<null>>('/reservation/admin/room', params)
  return response.data
}

export interface CreateRoomParams {
  name: string
  floor: string
  minHeadCount: number
  maxHeadCount: number
  displayOrder: number
  status: 'A' | 'N'
}
