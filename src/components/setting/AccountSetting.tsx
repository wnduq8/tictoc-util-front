import React from 'react'
import styled from 'styled-components'
import { media } from '@lib/styles/media'
import { useUserState } from '@src/atoms/userState'
import { useAdditionalForm } from '@hooks/useAdditionalForm'
import { authDescriptions } from '@components/auth/AdditionalAuthForm'
import AdditionalAuthInputGroup from '@components/auth/AdditionalAuthInputGroup'
import { StyledForm } from '@components/auth/StylesComponents'
import { Dialog } from 'antd-mobile'

function AccountSetting() {
  const [userState] = useUserState()

  const onSuccess = () => {
    Dialog.alert({
      content: '계정 정보가 변경 되었습니다.',
      confirmText: '확인',
      onConfirm: () => {
        window.location.reload()
      },
    })
  }

  const { isLoading, isError, inputProps, errors, onSubmit } = useAdditionalForm(onSuccess)

  const { namePlaceholder, departmentPlaceholder, buttonText } = authDescriptions['additional']

  if (!userState) return null

  return (
    <Block>
      <div>
        <Title>내 계정</Title>
        <Section>
          <UserInfo>
            <h4>이메일</h4>
            {userState.email}
          </UserInfo>
          <UserInfo>
            <h4>이름</h4>
            {userState.name}
          </UserInfo>
          <UserInfo>
            <h4>부서</h4>
            {userState.department}
          </UserInfo>
        </Section>
        <Section>
          <h4>내 정보</h4>
          <StyledForm method="post" onSubmit={onSubmit}>
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
        </Section>
      </div>
    </Block>
  )
}

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.gray5};
  font-size: 48px;
  line-height: 1.5;
`

const Block = styled.div`
  padding: 16px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;

  ${media.mobile} {
    width: 100%;
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
    flex: initial;
    margin-top: 96px;
  }
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  h4 {
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 16px;
    color: ${({ theme }) => theme.color.gray3};
  }

  & + & {
    margin-top: 32px;
  }
`
const UserInfo = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.color.gray5};
`

export default AccountSetting
