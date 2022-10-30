import client from '../../client'
import { CommonResponseType } from '@lib/type'
import { RoomsResult } from '@lib/api/rooms/getRooms'

export async function getAdminRooms() {
  const response = await client.get<CommonResponseType<RoomsResult[]>>('/reservation/admin/rooms')

  return response.data
}
