import styled from 'styled-components'
import { media } from '@lib/styles/media'
import FooterTabItem from './FooterTabItem'

function Footer() {
  return (
    <StyledFooter>
      <FooterTabItem icon="calendar" to="/" />
      <FooterTabItem icon="setting" to="/setting" />
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  height: 56px;
  border-top: 1px solid ${({ theme }) => theme.color.gray0};
  display: flex;
  ${media.mobile} {
    display: none;
  }
`

export default Footer
