export interface JsonRpcRequest<T = unknown> {
  id: string
  jsonrpc: '2.0'
  params: T
}

export interface JsonRpcResult<T = unknown> {
  id: string
  jsonrpc: '2.0'
  result: T
}

export interface JsonRpcError<T = unknown> {
  id: string
  jsonrpc: '2.0'
  error: T
}
