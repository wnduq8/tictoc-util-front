import Cookies from 'js-cookie'
import { JWT_NAME } from '@lib/constants'
import { useLayoutEffect, useState } from 'react'

export function useCheckPublic() {
  const [isRender, setIsRender] = useState(false)
  useLayoutEffect(() => {
    const jwt = Cookies.get(JWT_NAME)

    if (jwt) {
      window.location.href = '/'
      return
    }
    setIsRender(true)
  }, [])

  return {
    isRender,
  }
}
