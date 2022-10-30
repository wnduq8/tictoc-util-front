import { useMutation } from 'react-query'
import { emailSignin } from '@lib/api/users/emailSigin'
import { type UseMutationOptionsOf } from '@lib/type'
import { createEmail } from '@lib/api/admin/users/createEmail'

export function useEmailMutation(options: UseMutationOptionsOf<typeof emailSignin> = {}) {
  return useMutation(emailSignin, options)
}

export function useCreateEmailMutation(options: UseMutationOptionsOf<typeof createEmail> = {}) {
  return useMutation(createEmail, options)
}
