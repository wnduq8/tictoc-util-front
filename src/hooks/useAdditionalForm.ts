import { useAdditionalMutation } from '@hooks/mutation/useAdditionalMutation'
import { useForm } from '@hooks/useForm'
import { validate } from '@lib/validate'
import { useUserState } from '@src/atoms/userState'

export function useAdditionalForm(onSuccess: Function) {
  const [userState] = useUserState()
  const {
    mutateAsync: additionalMutate,
    isLoading,
    isError,
  } = useAdditionalMutation({
    onSuccess() {
      onSuccess()
    },
  })

  const { inputProps, handleSubmit, errors } = useForm({
    form: {
      name: {
        validate: validate.koreanName,
        errorMessage: '한글만 입력해주세요.',
      },
      department: {
        validate: (text: string) => text.length > 0,
        errorMessage: '해당 부서를 입력해주세요.',
      },
    },
    mode: 'all',
  })

  const onSubmit = handleSubmit(async (formDataJSON, e) => {
    const params = {
      ...formDataJSON,
      id: parseInt(userState?.id!, 10),
    }
    await additionalMutate(params)
  })

  return {
    isLoading,
    isError,
    inputProps,
    errors,
    onSubmit,
  }
}
