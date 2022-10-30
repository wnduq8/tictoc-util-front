import { atom, useRecoilState, useResetRecoilState } from 'recoil'
import { RoomsResult } from '@lib/api/rooms/getRooms'

export interface IRoomDataModalState extends RoomsResult {
  type: 'update' | 'create'
}

export const roomModalState = atom<{ open: boolean; data: IRoomDataModalState | null }>({
  key: 'roomModalState',
  default: {
    open: false,
    data: null,
  },
})

export function useRoomModalState() {
  return useRecoilState(roomModalState)
}

export function useResetRoomModalState() {
  return useResetRecoilState(roomModalState)
}
