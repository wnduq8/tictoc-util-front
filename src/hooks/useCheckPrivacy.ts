import { useLayoutEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { JWT_NAME } from '@lib/constants'
import { getUserInfo } from '@lib/api/users/user'
import { useUserState } from '@src/atoms/userState'
import { useNavigate } from 'react-router-dom'

export function useCheckPrivacy() {
  const [isRender, setIsRender] = useState(false)
  const [userState, setUserState] = useUserState()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    const jwt = Cookies.get(JWT_NAME)

    if (!jwt) {
      window.location.href = '/login'
      return
    }

    getUserInfo()
      .then((response) => {
        if (response.statusCode === 200) {
          setUserState(response.data)
          setIsRender(true)
        }
      })
      .catch((error) => {})
  }, [])

  useLayoutEffect(() => {
    if (!userState) {
      return
    }
    if (userState.status === 'N') {
      navigate('/additional-info')
    }
  }, [userState])

  return {
    isRender,
  }
}
