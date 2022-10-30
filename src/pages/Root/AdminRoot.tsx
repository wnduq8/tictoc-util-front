import React from 'react'
import { Outlet } from 'react-router-dom'
import { useCheckAdmin } from '@hooks/useCheckAdmin'
import AdminMenu from '@components/admin/Menu'
import styled from 'styled-components'

export default function AdminRoot() {
  const { isRender } = useCheckAdmin()

  return isRender ? (
    <>
      <AdminMenu />
      <StyledAdminContent>
        <Outlet />
      </StyledAdminContent>
    </>
  ) : null
}

const StyledAdminContent = styled.div`
  padding: 20px;
`
