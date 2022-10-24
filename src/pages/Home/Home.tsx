import React from 'react'
import TabLayout from '@components/layouts/TabLayout'
import styled from 'styled-components'
import { media } from '@lib/styles/media'

export default function Home() {
  return (
    <StyledTabLayout>
      <Content>
        <div>예약하자~</div>
      </Content>
    </StyledTabLayout>
  )
}

const StyledTabLayout = styled(TabLayout)`
  padding: 16px;
`

const Content = styled.div`
  ${media.wide} {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
`
