import Cookies from 'js-cookie'
import { JWT_NAME } from '@lib/constants'
import { useResetUserState } from '@src/atoms/userState'

export function useLogout() {
  const resetUserState = useResetUserState()
  const handleLogout = () => {
    resetUserState()
    Cookies.remove(JWT_NAME)
    window.location.href = '/login'
  }
  return handleLogout
}
