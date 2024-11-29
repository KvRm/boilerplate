import type { Http } from 'types'
import type { Handler } from '../../setup'

import { jsonRpcResult } from '../../json-rpc'
import * as dal from '../dal'

export const removeHandler: Handler<
  Http.User.Remove.Request,
  Http.User.Remove.Response
> = async (params) => {
  const isSuccess = await dal.removeOne(params)
  return jsonRpcResult({ isSuccess })
}
