import { useQuery } from 'react-query'
import { type UseQueryOptionsOf } from '@lib/type'
import { getReservationByUser } from '@lib/api/reservation/getReservationByUser'

export function useReservationByUserQuery(
  userId: string,
  options: UseQueryOptionsOf<typeof getReservationByUser> = {},
) {
  return useQuery(extractKey(userId), () => getReservationByUser(), options)
}

const extractKey = (key: string) => ['reservationByUser', key]

useReservationByUserQuery.extractKey = extractKey
