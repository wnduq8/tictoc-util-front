import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { media } from '@lib/styles/media'
import { Logo } from '../vectors'
import UserAddon from './UserAddon'

function DesktopHeader() {
  return (
    <Block>
      <HomeLink to="/">
        <StyledLogo />
      </HomeLink>
      <Content>
        <UserAddon username={'박주엽'} />
      </Content>
    </Block>
  )
}

const Block = styled.div`
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray0};
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
  display: none;
  ${media.mobile} {
    display: flex;
  }
`

const StyledLogo = styled(Logo)`
  display: block;
  height: 17px;
  width: auto;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HomeLink = styled(Link)`
  display: block;
  color: inherit;
`

export default DesktopHeader
