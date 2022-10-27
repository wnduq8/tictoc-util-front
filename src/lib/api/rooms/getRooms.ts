import client from '../client'
import { CommonResponseType } from '@lib/type'
import { CommonResult } from '@lib/api/type'

export async function getRooms() {
  const response = await client.get<CommonResponseType<RoomsResult[]>>('/reservation/rooms')

  return response.data
}

export interface RoomsResult extends CommonResult {
  name: string
  floor?: string
  minHeadCount: number
  maxHeadCount: number
  displayOrder: number
  status: 'A' | 'N'
}
