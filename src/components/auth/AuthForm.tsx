import React, { useState } from 'react'
import { Logo } from '@components/vectors'
import LabelInput from '@components/system/LabelInput'
import Button from '@components/system/Button'
import GoogleLoginButton from '@components/GoogleLoginButton'
import { useForm } from '@hooks/useForm'
import { validate } from '@lib/validate'
import {
  ActionErrorMessage,
  ActionsBox,
  DesktopLogo,
  InputGroup,
  Line,
  StyledForm,
} from '@components/auth/StylesComponents'
import { useNavigate } from 'react-router-dom'
import { useEmailMutation } from '@hooks/mutation/useEmailMutation'
import Cookies from 'js-cookie'
import { JWT_NAME } from '@lib/constants'
import { SpinLoading } from 'antd-mobile'

interface AuthFormProps {}

const authDescriptions = {
  login: {
    emailPlaceholder: '이메일을 입력하세요.',
    passwordPlaceholder: '비밀번호를 입력하세요.',
    buttonText: '로그인',
  },
} as const

function AuthForm({}: AuthFormProps) {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const {
    mutateAsync: loginMutate,
    isLoading: isEmailLoading,
    isError,
  } = useEmailMutation({
    onSuccess(data) {
      Cookies.set(JWT_NAME, data.data.token)
      navigate('/')
    },
  })
  const { emailPlaceholder, passwordPlaceholder, buttonText } = authDescriptions['login']

  const { inputProps, handleSubmit, errors } = useForm({
    form: {
      tictocEmail: {
        validate: validate.tictocEmail,
        errorMessage: '째깍악어 계정으로 입력해주세요.',
      },
      password: {
        validate: (text: string) => text.length > 0,
        errorMessage: '비밀번호를 입력해주세요.',
      },
    },
    mode: 'all',
  })

  const onSubmit = handleSubmit(async (formDataJSON, e) => {
    const params = {
      email: formDataJSON.tictocEmail,
      password: formDataJSON.password,
      isGoogle: false,
    }

    await loginMutate(params)
  })

  const isLoading = isGoogleLoading || isEmailLoading

  return (
    <StyledForm method="post" onSubmit={onSubmit}>
      <DesktopLogo>
        <Logo />
      </DesktopLogo>
      {isLoading ? (
        <SpinLoading style={{ '--size': '48px', margin: '100px auto 0' }} color={'#FCD400'} />
      ) : (
        <>
          <InputGroup>
            <LabelInput
              label="이메일"
              placeholder={emailPlaceholder}
              disabled={isEmailLoading}
              errorMessage={errors.tictocEmail}
              {...inputProps.tictocEmail}
            />
            <LabelInput
              label="비밀번호"
              name="password"
              placeholder={passwordPlaceholder}
              disabled={isEmailLoading}
              type="password"
              errorMessage={errors.password}
              {...inputProps.password}
            />
          </InputGroup>
          <ActionsBox>
            {isError && <ActionErrorMessage>잘못된 계정 정보입니다.</ActionErrorMessage>}
            <Button type="submit" layoutMode="fullWidth" disabled={isEmailLoading}>
              {buttonText}
            </Button>
            <Line />
            <GoogleLoginButton setIsGoogleLoading={setIsGoogleLoading} />
          </ActionsBox>
        </>
      )}
    </StyledForm>
  )
}

export default AuthForm
