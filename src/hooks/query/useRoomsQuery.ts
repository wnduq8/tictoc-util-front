import { useQuery } from 'react-query'
import { type UseQueryOptionsOf } from '@lib/type'
import { getRooms } from '@lib/api/rooms/getRooms'

export function useRoomsQuery(key: string, options: UseQueryOptionsOf<typeof getRooms> = {}) {
  return useQuery(extractKey(key), () => getRooms(), options)
}

const extractKey = (key: string) => ['rooms', key]

useRoomsQuery.extractKey = extractKey
