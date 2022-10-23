import React from 'react'
import BasicLayout from '@components/layouts/BasicLayout'
import AuthForm from '@components/auth/AuthForm'

export default function Login() {
  return (
    <BasicLayout title="로그인" desktopHeaderVisible={false}>
      <AuthForm />
    </BasicLayout>
  )
}
