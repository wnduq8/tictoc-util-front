import React from 'react'
import { Button } from 'antd-mobile'
import styled from 'styled-components'
import TabLayout from '@components/layouts/TabLayout'
import { Tictoccroc } from '@components/vectors'

export default function NotFound() {
  return (
    <TabLayout>
      <StyledNotFound>
        <Tictoccroc />
        <div className={'not_found_title'}>404</div>
        <div className={'not_found_desc'}>해당 페이지를 찾을 수 없습니다.</div>
        <StyledButton
          size="middle"
          onClick={() => {
            window.location.replace('/')
          }}
        >
          홈으로 가기
        </StyledButton>
      </StyledNotFound>
    </TabLayout>
  )
}

const StyledNotFound = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    margin-bottom: 20px;
    margin-right: 35px;
  }

  .not_found_title {
    font-size: 30px;
    margin-bottom: 15px;
  }

  .not_found_desc {
    font-size: 20px;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.color.gray2};
  }
`

const StyledButton = styled(Button)`
  max-width: 200px;
  background: ${({ theme }) => theme.color.primary};
`
