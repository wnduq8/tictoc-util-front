import styled from 'styled-components'
import { User } from '../vectors'

function UserAddon({ username }: { username: string }) {
  return (
    <Responsive>
      <Block>
        <User />
        {username}
      </Block>
    </Responsive>
  )
}

const Responsive = styled.div`
  display: flex;
  position: relative;
`

const Block = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.gray5};
  svg {
    margin-right: 8px;
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.color.gray5};
  }
`

export default UserAddon
