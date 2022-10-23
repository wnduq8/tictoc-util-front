import { useMutation } from 'react-query'
import { type UseMutationOptionsOf } from '@lib/type'
import { createAdditionalInfo } from '@lib/api/users/createAdditionalInfo'

export function useAdditionalMutation(options: UseMutationOptionsOf<typeof createAdditionalInfo> = {}) {
  return useMutation(createAdditionalInfo, options)
}
