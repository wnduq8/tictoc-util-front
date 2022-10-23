import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '@components/vectors'
import LabelInput from '@components/system/LabelInput'
import Button from '@components/system/Button'
import { useForm } from '@hooks/useForm'
import { validate } from '@lib/validate'
import { ActionErrorMessage, ActionsBox, DesktopLogo, InputGroup, StyledForm } from '@components/auth/StylesComponents'
import { useUserState } from '@src/atoms/userState'
import { useAdditionalMutation } from '@hooks/mutation/useAdditionalMutation'

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
  const [userState] = useUserState()
  const {
    mutateAsync: additionalMutate,
    isLoading,
    isError,
  } = useAdditionalMutation({
    onSuccess() {
      navigate('/')
    },
  })

  const { namePlaceholder, departmentPlaceholder, buttonText } = authDescriptions['additional']

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

  const onSubmit = handleSubmit(async (formDataJSON, e) => {
    const params = {
      ...formDataJSON,
      id: userState?.id!,
    }
    await additionalMutate(params)
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
          disabled={isLoading}
          errorMessage={errors.name}
          {...inputProps.name}
        />
        <LabelInput
          label="부서"
          placeholder={departmentPlaceholder}
          disabled={isLoading}
          errorMessage={errors.department}
          {...inputProps.department}
        />
      </InputGroup>
      <ActionsBox>
        {isError && <ActionErrorMessage>서버 처리에 이상이 있습니다. 관리자에게 문의해주세요.</ActionErrorMessage>}
        <Button type="submit" layoutMode="fullWidth" disabled={isLoading}>
          {buttonText}
        </Button>
      </ActionsBox>
    </StyledForm>
  )
}

export default AdditionalAuthForm
