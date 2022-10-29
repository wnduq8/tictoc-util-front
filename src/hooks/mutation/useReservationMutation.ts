import { useMutation } from 'react-query'
import { type UseMutationOptionsOf } from '@lib/type'
import { createReservation } from '@lib/api/reservation/createReservation'

export function useCreateReserMutation(options: UseMutationOptionsOf<typeof createReservation> = {}) {
  return useMutation(createReservation, options)
}
