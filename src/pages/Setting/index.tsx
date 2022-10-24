import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import TabLayout from '@components/layouts/TabLayout'
import { useLogout } from '@hooks/useLogout'

function SettingIndex() {
  const logout = useLogout()

  return (
    <TabLayout>
      <Block>
        <ListWrapper>
          <ListItemLink to="/setting/account">내 계정</ListItemLink>
          <ListItem onClick={logout}>로그아웃</ListItem>
        </ListWrapper>
      </Block>
    </TabLayout>
  )
}

const Block = styled.div`
  background: ${({ theme }) => theme.color.gray0};
  flex: 1;
`

const ListWrapper = styled.div`
  * + div {
    border-top: 1px solid ${({ theme }) => theme.color.gray0};
  }
`

const listItemStyle = css`
  padding: 16px;
  color: ${({ theme }) => theme.color.gray5};
  background: white;
  &:active {
    opacity: 0.7;
  }
`

const ListItem = styled.div`
  ${listItemStyle}
`

const ListItemLink = styled(Link)`
  display: block;
  text-decoration: none;
  ${listItemStyle}
`

export default SettingIndex
