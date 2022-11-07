import { useQuery } from 'react-query'
import { type UseQueryOptionsOf } from '@lib/type'
import { getAdminUsers } from '@lib/api/admin/users/getAdminUsers'

export function useAdminUsersQuery(
  { offset, limit }: { offset: number; limit: number },
  options: UseQueryOptionsOf<typeof getAdminUsers> = {},
) {
  return useQuery(extractKey(offset), () => getAdminUsers(offset, limit), options)
}

const extractKey = (key: number) => ['admin_users', key]

useAdminUsersQuery.extractKey = extractKey
