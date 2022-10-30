import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { media } from '@lib/styles/media'
import { Logo } from '../vectors'
import UserAddon from './UserAddon'
import { useUserState } from '@src/atoms/userState'

function DesktopHeader() {
  const [userState] = useUserState()
  return (
    <Block>
      <HomeLink to="/">
        <StyledLogo />
      </HomeLink>
      <Content>
        {userState && (
          <UserAddon username={userState.name} profileImage={userState.profileImage} isAdmin={userState.isAdmin} />
        )}
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
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`

const HomeLink = styled(Link)`
  display: block;
  color: inherit;
`

export default DesktopHeader
