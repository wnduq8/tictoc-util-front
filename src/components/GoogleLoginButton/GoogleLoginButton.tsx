import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useGoogleMutation } from '@hooks/mutation/useGoogleMutation'
import { ActionErrorMessage } from '@components/auth/StylesComponents'
import React, { useEffect } from 'react'
import { JWT_NAME } from '@lib/constants'

export type GoogleLoginButtonProps = {
  setIsGoogleLoading: React.Dispatch<React.SetStateAction<boolean>>
}

function GoogleLoginButton({ setIsGoogleLoading }: GoogleLoginButtonProps) {
  const navigate = useNavigate()
  const {
    mutateAsync: googleLoginMutate,
    isError,
    isLoading,
  } = useGoogleMutation({
    onSuccess(data) {
      Cookies.set(JWT_NAME, data.data.token)
      navigate('/')
    },
  })

  const onSuccess = async (res: any) => {
    await googleLoginMutate(res.credential)
  }

  const onError = () => {
    alert('구글 로그인 오류')
  }

  useEffect(() => {
    setIsGoogleLoading(isLoading)
  }, [isLoading])

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID ?? ''}>
      {isError && <ActionErrorMessage>잘못된 계정 정보입니다.</ActionErrorMessage>}
      <GoogleLogin onSuccess={onSuccess} onError={onError} theme={'filled_blue'} type={'standard'} />
    </GoogleOAuthProvider>
  )
}

export default GoogleLoginButton
