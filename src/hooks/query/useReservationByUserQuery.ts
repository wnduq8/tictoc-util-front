import { useQuery } from 'react-query'
import { type UseQueryOptionsOf } from '@lib/type'
import { getReservationByUser } from '@lib/api/reservation/getReservationByUser'

export function useReservationByUserQuery(
  { offset, limit }: { offset: number; limit: number },
  options: UseQueryOptionsOf<typeof getReservationByUser> = {},
) {
  return useQuery(extractKey(offset), () => getReservationByUser(offset, limit), options)
}

const extractKey = (key: number) => ['reservationByUser', key]

useReservationByUserQuery.extractKey = extractKey
