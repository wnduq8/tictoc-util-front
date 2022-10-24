import React from 'react'
import LabelInput from '@components/system/LabelInput'
import Button from '@components/system/Button'
import { ActionErrorMessage, ActionsBox, InputGroup } from '@components/auth/StylesComponents'
import { DotLoading } from 'antd-mobile'

interface AdditionalAuthInputGroupProps {
  namePlaceholder: string
  departmentPlaceholder: string
  isLoading: boolean
  isError: boolean
  nameErrorMessage?: string | null
  departmentErrorMessage?: string | null
  inputProps: any
  buttonText: string
}

function AdditionalAuthInputGroup({
  namePlaceholder,
  departmentPlaceholder,
  isLoading,
  isError,
  nameErrorMessage,
  departmentErrorMessage,
  inputProps,
  buttonText,
}: AdditionalAuthInputGroupProps) {
  return (
    <>
      <InputGroup>
        <LabelInput
          label="이름"
          placeholder={namePlaceholder}
          disabled={isLoading}
          errorMessage={nameErrorMessage}
          {...inputProps.name}
        />
        <LabelInput
          label="부서"
          placeholder={departmentPlaceholder}
          disabled={isLoading}
          errorMessage={departmentErrorMessage}
          {...inputProps.department}
        />
      </InputGroup>
      <ActionsBox>
        {isError && <ActionErrorMessage>서버 처리에 이상이 있습니다. 관리자에게 문의해주세요.</ActionErrorMessage>}
        <Button type="submit" layoutMode="fullWidth" disabled={isLoading}>
          {isLoading ? <DotLoading color="white" /> : buttonText}
        </Button>
      </ActionsBox>
    </>
  )
}

export default AdditionalAuthInputGroup
