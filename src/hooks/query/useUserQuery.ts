import { useQuery } from 'react-query'
import { type UseQueryOptionsOf } from '@lib/type'
import { getUserInfo } from '@lib/api/users/user'

export function useUserQuery(key: string, options: UseQueryOptionsOf<typeof getUserInfo> = {}) {
  return useQuery(extractKey(key), () => getUserInfo(), options)
}

const extractKey = (key: string) => ['user', key]

useUserQuery.extractKey = extractKey
