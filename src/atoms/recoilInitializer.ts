import { MutableSnapshot } from 'recoil'
import { themeState } from './themeState'
import Cookies from 'js-cookie'

export default function recoilInitializer({ set }: MutableSnapshot) {
  const theme: any = Cookies.get('theme') || 'light'
  set(themeState, theme)
}
