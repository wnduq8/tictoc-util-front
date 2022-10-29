import { useMutation } from 'react-query'
import { type UseMutationOptionsOf } from '@lib/type'
import { createReservation } from '@lib/api/reservation/createReservation'
import { deleteReservation } from '@lib/api/reservation/deleteReservation'

export function useCreateReserMutation(options: UseMutationOptionsOf<typeof createReservation> = {}) {
  return useMutation(createReservation, options)
}

export function useDeleteReserMutation(options: UseMutationOptionsOf<typeof deleteReservation> = {}) {
  return useMutation(deleteReservation, options)
}
