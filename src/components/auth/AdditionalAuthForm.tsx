import React, { useCallback } from 'react'
import { Logo, Tictoccroc } from '@components/vectors'
import { DesktopLogo, StyledForm } from '@components/auth/StylesComponents'
import { useAdditionalForm } from '@hooks/useAdditionalForm'
import AdditionalAuthInputGroup from '@components/auth/AdditionalAuthInputGroup'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

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
  const onSuccess = useCallback(() => {
    navigate('/')
  }, [])
  const { isLoading, isError, inputProps, errors, onSubmit } = useAdditionalForm(onSuccess)

  const { namePlaceholder, departmentPlaceholder, buttonText } = authDescriptions['additional']

  return (
    <StyledForm method="post" onSubmit={onSubmit}>
      <DesktopLogo>
        <Logo />
      </DesktopLogo>
      <StyledWelcomeWrap>
        <Tictoccroc />
        <p>환영합니다.</p>
        <p>추가 정보를 입력해주세요!</p>
      </StyledWelcomeWrap>
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

const StyledWelcomeWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 700;

  svg {
    margin-left: -35px;
    margin-bottom: 10px;
  }
`
