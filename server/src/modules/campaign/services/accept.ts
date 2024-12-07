import type { Http } from 'types'
import type { Handler } from '../../setup'

import { jsonRpcResult } from '../../json-rpc'
import * as dal from '../dal'

export const acceptHandler: Handler<
  Http.Campaign.Accept.Request,
  Http.Campaign.Accept.Response
> = async (params) => {
  const result = await dal.accept(params)
  return jsonRpcResult(result)
}
