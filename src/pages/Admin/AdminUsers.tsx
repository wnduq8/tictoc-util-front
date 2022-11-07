import React from 'react'
import { useAdminUsersQuery } from '@hooks/admin/query/useAdminUsersQuery'

function AdminUsers() {
  const { data } = useAdminUsersQuery({ offset: 1, limit: 10 }, { cacheTime: 0 })
  console.log(data)

  return <div>asd</div>
}

export default AdminUsers
