import { useRef, useState } from 'react'
import styled from 'styled-components'
import { User } from '../vectors'
import Button from '@components/system/Button'
import UserMenu from '@components/base/UserMenu'

function UserAddon({ username, profileImage, isAdmin }: { username: string; profileImage?: string; isAdmin: boolean }) {
  const [visible, setVisible] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const onOpen = () => setVisible(true)
  const onClose = (e?: Event) => {
    const isButton = buttonRef.current?.contains(e?.target as Node) || buttonRef.current === e?.target
    if (isButton) return
    setVisible(false)
  }
  return (
    <Responsive>
      {profileImage ? (
        <CircleImg src={profileImage} alt={'user-img'} onClick={onOpen} />
      ) : (
        <Button variant="text" size="small" onClick={onOpen} ref={buttonRef}>
          <Block>
            <User />
            {username}
          </Block>
        </Button>
      )}
      <UserMenu visible={visible} onClose={onClose} isAdmin={isAdmin} />
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

const CircleImg = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
  border-radius: 50%;
`

export default UserAddon
