import React from 'react'
import { Outlet } from 'react-router-dom'
import { useCheckPublic } from '@hooks/useCheckPublic'

export default function PublicRoot() {
  const { isRender } = useCheckPublic()

  return isRender ? <Outlet /> : null
}
