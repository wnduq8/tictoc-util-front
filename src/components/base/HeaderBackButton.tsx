import styled from 'styled-components'
import { ArrowLeft } from '../vectors'

interface Props {
  onClick?: () => void
}

function HeaderBackButton({ onClick }: Props) {
  return (
    <IconButton onClick={onClick}>
      <ArrowLeft />
    </IconButton>
  )
}

const IconButton = styled.button`
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-left: -8px;
  cursor: pointer;

  svg {
    color: ${({ theme }) => theme.color.gray5};
  }
`

export default HeaderBackButton
