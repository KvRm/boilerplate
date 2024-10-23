import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import { toast } from 'vue3-toastify'

export const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 30,
        throwOnError: ({ message }) => {
          if (message === 'ACCESS_DENIED')
            return false
          toast.error(message)
          return false
        },
      },
      mutations: {
        retry: false,
        onError: ({ message }) => {
          toast(message)
        },
      },
    },
  },
}
