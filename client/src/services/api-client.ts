import axios from 'axios'
import type { Http, JsonRpcError, JsonRpcResult } from 'types'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
})

export async function jsonRpcFetch<Result>(methodPath: Http.MethodPath, params: unknown, signal?: AbortSignal) {
  const response = await apiClient.post<JsonRpcResult<Result> | JsonRpcError>(methodPath, {
    id: generateUuid(),
    jsonrpc: '2.0',
    params,
  }, { signal })
  if ('error' in response.data) {
    throw new Error(`${methodPath}: ${response.data.error}`)
  }
  return (response.data as JsonRpcResult<Result>).result
}
