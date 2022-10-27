import { NavLink, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { Calendar, Setting } from '../vectors'

const iconMap = {
  calendar: Calendar,
  setting: Setting,
}

interface Props {
  icon: keyof typeof iconMap
  to: string
}

function FooterTabItem({ icon, to }: Props) {
  const [activeColor, setActiveColor] = useState<string>('')
  const { pathname } = useLocation()
  const iconEl = React.createElement(iconMap[icon])

  useEffect(() => {
    if (to === '/') {
      setActiveColor(to === pathname ? 'active_color' : '')
      return
    }
    setActiveColor(pathname.startsWith(to) ? 'active_color' : '')
  }, [])

  return (
    <LinkItem to={to} className={activeColor}>
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
    color: ${({ theme }) => theme.color.gray2};
    width: 32px;
    height: 32px;
  }
`

const LinkItem = styled(NavLink)`
  ${sharedStyle}
  &.active_color {
    svg {
      color: ${({ theme }) => theme.color.primary};
    }
  }
`

export default FooterTabItem
