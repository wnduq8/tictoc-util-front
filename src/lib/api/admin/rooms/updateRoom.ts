import client from '../../client'
import { CommonResponseType } from '@lib/type'
import { CreateRoomParams } from '@lib/api/admin/rooms/createRoom'

export async function updateRoom(params: UpdateRoomParams) {
  const response = await client.patch<CommonResponseType<null>>('/reservation/admin/room', params)
  return response.data
}

export interface UpdateRoomParams extends CreateRoomParams {
  id: string | number
}
