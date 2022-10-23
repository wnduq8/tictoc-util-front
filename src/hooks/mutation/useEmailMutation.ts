import { useMutation } from 'react-query'
import { emailSignin } from '@lib/api/users/emailSigin'
import { type UseMutationOptionsOf } from '@lib/type'

export function useEmailMutation(options: UseMutationOptionsOf<typeof emailSignin> = {}) {
  return useMutation(emailSignin, options)
}
