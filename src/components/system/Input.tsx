import React, { forwardRef } from 'react'
import styled from 'styled-components'

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string | null
}

const Input = forwardRef<HTMLInputElement, Props>(({ errorMessage, ...rest }: Props, ref) => {
  return (
    <>
      <StyledInput {...rest} />
      {errorMessage ? <Message>{errorMessage}</Message> : null}
    </>
  )
})

Input.displayName = 'Input'

const StyledInput = styled.input`
  height: 48px;
  border: 1px solid ${({ theme }) => theme.color.gray2};
  border-radius: 4px;
  outline: none;
  font-size: 16px;
  padding-left: 16px;
  padding-right: 16px;
  color: ${({ theme }) => theme.color.gray5};
  transition: all 0.25s ease-in-out;
  &:focus {
    border: 1px solid ${({ theme }) => theme.color.primary};
  }
  &::placeholder {
    color: ${({ theme }) => theme.color.gray2};
  }
  &:disabled {
    background: ${({ theme }) => theme.color.gray0};
    color: ${({ theme }) => theme.color.gray3};
  }
`

const Message = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: red;
`

export default Input
