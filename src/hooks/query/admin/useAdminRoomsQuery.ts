import { useQuery } from 'react-query'
import { type UseQueryOptionsOf } from '@lib/type'
import { getAdminRooms } from '@lib/api/admin/rooms/getAdminRooms'

export function useAdminRoomsQuery(key: string, options: UseQueryOptionsOf<typeof getAdminRooms> = {}) {
  return useQuery(extractKey(key), () => getAdminRooms(), options)
}

const extractKey = (key: string) => ['adminRooms', key]

useAdminRoomsQuery.extractKey = extractKey
