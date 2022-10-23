import styled from 'styled-components'
import { Form } from 'react-router-dom'
import { media } from '@lib/styles/media'

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  padding: 16px;
  flex: 1;

  justify-content: space-between;

  ${media.mobile} {
    justify-content: center;
    width: 460px;
    align-self: center;
  }
`

export const DesktopLogo = styled.div`
  display: none;
  ${media.mobile} {
    display: flex;
  }
  justify-content: center;
  margin-bottom: 48px;
  svg {
    color: black;
    height: 32px;
    width: auto;
  }
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const ActionsBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  ${media.mobile} {
    margin-top: 24px;
  }
`

export const ActionErrorMessage = styled.div`
  text-align: center;
  color: red;
  font-size: 14px;
`

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.color.gray1};
`
