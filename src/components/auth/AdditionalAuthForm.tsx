import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '@components/vectors'
import LabelInput from '@components/system/LabelInput'
import Button from '@components/system/Button'
import { useForm } from '@hooks/useForm'
import { validate } from '@lib/validate'
import {
  ActionErrorMessage,
  ActionsBox,
  DesktopLogo,
  InputGroup,
  StyledForm,
} from '@components/auth/AuthStylesComponents'

const authDescriptions = {
  additional: {
    namePlaceholder: '이름을 입력하세요.',
    departmentPlaceholder: '부서를 입력하세요.',
    phonePlaceholder: '핸드폰 번호를 입력하세요.',
    buttonText: '저장',
  },
} as const

interface AuthFormProps {}

function AdditionalAuthForm({}: AuthFormProps) {
  const navigate = useNavigate()
  const { namePlaceholder, departmentPlaceholder, phonePlaceholder, buttonText } = authDescriptions['additional']

  const { inputProps, handleSubmit, errors } = useForm({
    form: {
      name: {
        validate: validate.koreanName,
        errorMessage: '한글만 입력해주세요.',
      },
      department: {
        validate: (text: string) => text.length > 0,
        errorMessage: '해당 부서를 입력해주세요.',
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
          label="이름"
          placeholder={namePlaceholder}
          disabled={false}
          errorMessage={errors.name}
          {...inputProps.name}
        />
        <LabelInput
          label="부서"
          placeholder={departmentPlaceholder}
          disabled={false}
          errorMessage={errors.department}
          {...inputProps.department}
        />
      </InputGroup>
      <ActionsBox>
        {/*<ActionErrorMessage>잘못된 계정 정보입니다.</ActionErrorMessage>*/}
        <Button type="submit" layoutMode="fullWidth" disabled={false}>
          {buttonText}
        </Button>
      </ActionsBox>
    </StyledForm>
  )
}

export default AdditionalAuthForm
