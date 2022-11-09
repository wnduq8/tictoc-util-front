import { useQuery } from 'react-query'
import { type UseQueryOptionsOf } from '@lib/type'
import { getAdminReservationByUser } from '@lib/api/admin/reservation/getAdminReservationByUser'

export function useAdminReservationByUserQuery(
  { userId, offset, limit }: { userId: number; offset: number; limit: number },
  options: UseQueryOptionsOf<typeof getAdminReservationByUser> = {},
) {
  return useQuery(extractKey(userId, offset), () => getAdminReservationByUser(userId, offset, limit), options)
}

const extractKey = (userId: number, offset: number) => ['admin_reservation_user', userId, offset]

useAdminReservationByUserQuery.extractKey = extractKey
