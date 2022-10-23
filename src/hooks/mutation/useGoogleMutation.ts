import { useMutation } from 'react-query'
import { googleSignin } from '@lib/api/users/googleSigin'
import { type UseMutationOptionsOf } from '@lib/type'

export function useGoogleMutation(options: UseMutationOptionsOf<typeof googleSignin> = {}) {
  return useMutation(googleSignin, options)
}
