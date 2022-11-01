import { useMutation } from 'react-query'
import { type UseMutationOptionsOf } from '@lib/type'
import { createRoom } from '@lib/api/admin/rooms/createRoom'
import { updateRoom } from '@lib/api/admin/rooms/updateRoom'

export function useCreateRoomMutation(options: UseMutationOptionsOf<typeof createRoom> = {}) {
  return useMutation(createRoom, options)
}

export function useUpdateRoomMutation(options: UseMutationOptionsOf<typeof updateRoom> = {}) {
  return useMutation(updateRoom, options)
}
