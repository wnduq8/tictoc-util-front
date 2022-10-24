import Cookies from 'js-cookie'
import { JWT_NAME } from '@lib/constants'

export function useLogout() {
  const handleLogout = () => {
    Cookies.remove(JWT_NAME)
    window.location.href = '/login'
  }
  return handleLogout
}
