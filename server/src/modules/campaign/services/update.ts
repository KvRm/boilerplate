import type { Http } from 'types'
import type { Handler } from '../../setup'

import { jsonRpcResult } from '../../json-rpc'
import * as dal from '../dal'

export const updateHandler: Handler<
  Http.Campaign.Update.Request,
  Http.Campaign.Update.Response
> = async (params) => {
  const result = await dal.updateOne(params)
  return jsonRpcResult(result)
}
