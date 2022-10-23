import { NavLink } from 'react-router-dom'
import React from 'react'
import styled, { css } from 'styled-components'
import { Home, Setting } from '../vectors'

const iconMap = {
  home: Home,
  setting: Setting,
}

interface Props {
  icon: keyof typeof iconMap
  to: string
}

function FooterTabItem({ icon, to }: Props) {
  const iconEl = React.createElement(iconMap[icon])
  return (
    <LinkItem
      to={to}
      className={({ isActive }) => {
        if (isActive) return 'active'
        return ''
      }}
    >
      {iconEl}
    </LinkItem>
  )
}

const sharedStyle = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: grey;
    width: 32px;
    height: 32px;
  }
  &:active {
    svg {
      color: yellow;
    }
  }
`

const LinkItem = styled(NavLink)`
  ${sharedStyle}
  &.active {
    svg {
      color: yellow;
    }
  }
`

export default FooterTabItem
