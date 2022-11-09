import { atom, useRecoilState, useResetRecoilState } from 'recoil'
import { IUser } from '@lib/api/admin/users/getAdminUsers'

export const reservationByUserModalState = atom<{ open: boolean; data: IUser | null }>({
  key: 'reservationByUserModalState',
  default: {
    open: false,
    data: null,
  },
})

export function useReserByUserModalState() {
  return useRecoilState(reservationByUserModalState)
}

export function useResetReserByUserModalState() {
  return useResetRecoilState(reservationByUserModalState)
}
