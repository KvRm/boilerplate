import type { Http } from 'types'
import type { Handler } from '../../setup'

import { jsonRpcResult } from '../../json-rpc'
import * as dal from '../dal'

export const updateHandler: Handler<
  Http.User.Update.Request,
  Http.User.Update.Response
> = async (params) => {
  const result = await dal.updateOne(params)
  return jsonRpcResult(result)
}
