import React from 'react'
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
} from '@components/auth/AuthStylesComponents'
import { useNavigate } from 'react-router-dom'

interface AuthFormProps {}

const authDescriptions = {
  login: {
    emailPlaceholder: '이메일을 입력하세요.',
    passwordPlaceholder: '비밀번호를 입력하세요.',
    buttonText: '로그인',
  },
} as const

function AuthForm({}: AuthFormProps) {
  const navigate = useNavigate()
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

  const onSubmit = handleSubmit((formDataJSON, e) => {
    console.log(formDataJSON)
    navigate('/')
  })

  return (
    <StyledForm method="post" onSubmit={onSubmit}>
      <DesktopLogo>
        <Logo />
      </DesktopLogo>
      <InputGroup>
        <LabelInput
          label="이메일"
          placeholder={emailPlaceholder}
          disabled={false}
          errorMessage={errors.tictocEmail}
          {...inputProps.tictocEmail}
        />
        <LabelInput
          label="비밀번호"
          name="password"
          placeholder={passwordPlaceholder}
          disabled={false}
          type="password"
          errorMessage={errors.password}
          {...inputProps.password}
        />
      </InputGroup>
      <ActionsBox>
        {/*<ActionErrorMessage>잘못된 계정 정보입니다.</ActionErrorMessage>*/}
        <Button type="submit" layoutMode="fullWidth" disabled={false}>
          {buttonText}
        </Button>
        <Line />
        <GoogleLoginButton />
      </ActionsBox>
    </StyledForm>
  )
}

export default AuthForm
