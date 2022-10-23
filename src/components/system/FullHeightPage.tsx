import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalFullHeight = createGlobalStyle`
  html, body {
    height: 100%;
  }
`

interface Props {
  children: React.ReactNode
}
function FullHeightPage({ children }: Props) {
  return (
    <>
      <Page>{children}</Page>
      <GlobalFullHeight />
    </>
  )
}

const Page = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.color.background};
`

export default FullHeightPage
