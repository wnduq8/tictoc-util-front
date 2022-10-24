import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '@components/vectors'
import { DesktopLogo, StyledForm } from '@components/auth/StylesComponents'
import { useAdditionalForm } from '@hooks/useAdditionalForm'
import AdditionalAuthInputGroup from '@components/auth/AdditionalAuthInputGroup'

export const authDescriptions = {
  additional: {
    namePlaceholder: '이름을 입력하세요.',
    departmentPlaceholder: '부서를 입력하세요.',
    buttonText: '저장',
  },
} as const

interface AuthFormProps {}

function AdditionalAuthForm({}: AuthFormProps) {
  const navigate = useNavigate()
  const onSuccess = () => {
    navigate('/')
  }
  const { isLoading, isError, inputProps, errors, onSubmit } = useAdditionalForm(onSuccess)

  const { namePlaceholder, departmentPlaceholder, buttonText } = authDescriptions['additional']

  return (
    <StyledForm method="post" onSubmit={onSubmit}>
      <DesktopLogo>
        <Logo />
      </DesktopLogo>
      <AdditionalAuthInputGroup
        namePlaceholder={namePlaceholder}
        isLoading={isLoading}
        nameErrorMessage={errors.name}
        inputProps={inputProps}
        departmentPlaceholder={departmentPlaceholder}
        departmentErrorMessage={errors.department}
        isError={isError}
        buttonText={buttonText}
      />
    </StyledForm>
  )
}

export default AdditionalAuthForm
