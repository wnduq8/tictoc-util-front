import { useQuery } from 'react-query'
import { type UseQueryOptionsOf } from '@lib/type'
import { getReservation } from '@lib/api/reservation/getReservation'

export function useReservationQuery(date: string, options: UseQueryOptionsOf<typeof getReservation> = {}) {
  return useQuery(extractKey(date), () => getReservation({ date }), options)
}

const extractKey = (key: string) => ['reservationDate', key]

useReservationQuery.extractKey = extractKey
