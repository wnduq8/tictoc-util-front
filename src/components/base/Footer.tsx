import styled from 'styled-components'
import { media } from '@lib/styles/media'
import FooterTabItem from './FooterTabItem'

function Footer() {
  return (
    <StyledFooter>
      <FooterTabItem icon="home" to="/" />
      <FooterTabItem icon="setting" to="/setting" />
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  height: 56px;
  border-top: 1px solid grey;
  display: flex;
  ${media.mobile} {
    display: none;
  }
`

export default Footer
