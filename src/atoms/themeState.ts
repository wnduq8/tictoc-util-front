import { atom, useRecoilState } from 'recoil'

export const themeState = atom<'dark' | 'light'>({
  key: 'themeState',
  default: 'light',
})

export function useThemeState() {
  return useRecoilState(themeState)
}
