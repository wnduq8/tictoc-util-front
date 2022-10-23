import React from 'react'
import { Outlet } from 'react-router-dom'
import { useCheckPrivacy } from '@hooks/useCheckPrivacy'

export default function PrivacyRoot() {
  const { isRender } = useCheckPrivacy()
  return isRender ? <Outlet /> : null
}
