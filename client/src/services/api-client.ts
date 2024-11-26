import type { AxiosError } from 'axios'
import axios from 'axios'
import type { Http, JsonRpcError, JsonRpcResult } from 'types'
import { toast } from 'vue3-toastify'

const apiClient = axios.create({
  baseURL: import.meta.env.API_URL,
})

export async function jsonRpcFetch<Result>(methodPath: Http.MethodPath, params: unknown, signal: AbortSignal) {
  try {
    const response = await apiClient.post<JsonRpcResult<Result> | JsonRpcError<string>>(methodPath, {
      id: generateUuid(),
      jsonrpc: '2.0',
      params,
    }, { signal })
    if ('error' in response.data) {
      toast(response.data.error, { type: 'error' })
      throw new Error(response.data.error)
    }
    return (response.data as JsonRpcResult<Result>).result
  }
  catch (error) {
    toast((error as AxiosError).message, { type: 'error' })
  }
}
