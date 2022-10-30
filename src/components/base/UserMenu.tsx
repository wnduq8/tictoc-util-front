import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import styled from 'styled-components'
import { useOnClickOutside } from '@hooks/useClickOutside'
import { useLogout } from '@hooks/useLogout'

interface Props {
  visible: boolean
  onClose(e?: Event): void
  isAdmin: boolean
}

function UserMenu({ visible, onClose, isAdmin }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, (e) => {
    onClose(e)
  })
  const logout = useLogout()
  const navigate = useNavigate()

  return (
    <AnimatePresence initial={false}>
      {visible ? (
        <Block
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{
            duration: 0.125,
          }}
          ref={ref}
          onClick={() => onClose()}
        >
          <TriangleBorder />
          <Triangle />
          <MenuItem onClick={() => navigate('/setting/account')}>내 계정</MenuItem>
          <MenuItem onClick={() => navigate('/my-reservation')}>내 회의실 예약 현황</MenuItem>
          {isAdmin && <MenuItem onClick={() => navigate('/admin')}>어드민</MenuItem>}
          <MenuItem onClick={logout}>로그아웃</MenuItem>
        </Block>
      ) : null}
    </AnimatePresence>
  )
}

const Block = styled(motion.div)`
  position: absolute;
  right: 0;
  top: 48px;
  background: white;
  width: 200px;
  border: 1px solid ${({ theme }) => theme.color.gray0};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
  z-index: 100;
`

const MenuItem = styled.div`
  padding: 16px;
  cursor: pointer;
  &:hover {
    transition: all 0.125s ease-in;
    background: ${({ theme }) => theme.color.gray0};
  }
`

const Triangle = styled.div`
  position: absolute;
  right: 16px;
  top: -8px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white;
  z-index: 2;
`

const TriangleBorder = styled.div`
  position: absolute;
  right: 14px;
  top: -10px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #e0e0e0;
  z-index: 1;
`

export default UserMenu
