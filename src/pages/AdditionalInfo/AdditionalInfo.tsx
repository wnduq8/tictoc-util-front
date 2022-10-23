import React from 'react'
import BasicLayout from '@components/layouts/BasicLayout'
import AdditionalAuthForm from '@components/auth/AdditionalAuthForm'

export default function AdditionalInfo() {
  return (
    <BasicLayout title="추가 정보 입력" desktopHeaderVisible={false}>
      <AdditionalAuthForm />
    </BasicLayout>
  )
}
