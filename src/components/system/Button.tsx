import React, { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { hover } from '@lib/styles/actionUtils'

interface ButtonProps {
  size?: 'small' | 'medium'
  layoutMode?: 'inline' | 'fullWidth'
  variant?: 'primary' | 'secondary' | 'text'
}
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonProps {
  to?: string
  href?: string
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ layoutMode = 'inline', variant = 'primary', size = 'medium', to, href, ...rest }, ref) => {
    if (href) {
      return (
        <StyledAnchor
          layoutMode={layoutMode}
          variant={variant}
          size={size}
          href={href}
          className={rest.className}
          style={rest.style}
          ref={ref as any}
        >
          {rest.children}
        </StyledAnchor>
      )
    }

    if (to) {
      return (
        <StyledLink
          layoutMode={layoutMode}
          variant={variant}
          size={size}
          to={to}
          className={rest.className}
          style={rest.style}
          ref={ref as any}
        >
          {rest.children}
        </StyledLink>
      )
    }
    return <StyledButton layoutMode={layoutMode} variant={variant} size={size} ref={ref} {...rest} />
  },
)

Button.displayName = 'Button'

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.color.primary};
    color: white;
    ${hover(css`
      opacity: 0.875;
    `)}
  `,
  secondary: css`
    background: ${({ theme }) => theme.color.secondary};
    color: ${({ theme }) => theme.color.secondaryButtonText};
    ${hover(css`
      opacity: 0.5;
    `)}
  `,
  text: css`
    background: transparent;
    color: ${({ theme }) => theme.color.gray4};
    ${({ theme }) => hover(`background: ${theme.color.gray0};`)}
  `,
}

const sizeStyles = {
  small: css`
    height: 36px;
    font-size: 14px;
    padding-left: 12px;
    padding-right: 12px;
  `,
  medium: css`
    height: 48px;
    font-size: 16px;
    padding-left: 16px;
    padding-right: 16px;
  `,
}

const sharedStyles = css<ButtonProps>`
  display: flex;
  ${(props) => variantStyles[props.variant!]}
  ${(props) => sizeStyles[props.size!]}
  border: none;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 4px;
  transition: filter 0.25s ease-in-out;
  cursor: pointer;

  &:disabled {
    filter: grayscale(0.6);
  }

  ${(props) =>
    props.layoutMode === 'fullWidth' &&
    css`
      width: 100%;
    `}
`

const StyledButton = styled.button<ButtonProps>`
  ${sharedStyles}
`

const StyledAnchor = styled.a<ButtonProps>`
  text-decoration: none;
  ${sharedStyles}
`

const StyledLink = styled(Link)<ButtonProps>`
  text-decoration: none;
  ${sharedStyles}
`

export default Button
