import type { Http } from 'types'
import type { Handler } from '../../setup'

import { jsonRpcError, jsonRpcResult } from '../../json-rpc'
import * as dal from '../dal'

export const createHandler: Handler<
  Http.Campaign.Create.Request,
  Http.Campaign.Create.Response
> = async (params, reply) => {
  if (await dal.getOneByName(params.name)) {
    return jsonRpcError(reply, 'Name should be unique')
  }
  const result = await dal.createOne(params)
  return jsonRpcResult(result)
}
