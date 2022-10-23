import { atom, useRecoilState, useResetRecoilState } from 'recoil'
import { UserResult } from '@lib/api/users/user'

export const userState = atom<UserResult | null>({
  key: 'userState',
  default: null,
})

export function useUserState() {
  return useRecoilState(userState)
}

export function useResetUserState() {
  return useResetRecoilState(userState)
}
