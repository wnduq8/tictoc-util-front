import React from 'react'
import TabLayout from '@components/layouts/TabLayout'
import styled from 'styled-components'
import { media } from '@lib/styles/media'
import { Guide, ReservationTableWrap } from '@components/reservation'
import CreateReserModal from '@components/modals/CreateReserModal'

export default function Home() {
  return (
    <StyledTabLayout>
      <Content>
        <Guide />
        <ReservationTableWrap />
      </Content>
      <CreateReserModal />
    </StyledTabLayout>
  )
}

const StyledTabLayout = styled(TabLayout)`
  padding: 16px;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  ${media.wide} {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
`
