import type { Http } from 'types'
import type { Handler } from '../../setup'
import { jsonRpcResult } from '../../json-rpc'

import * as dal from '../dal'

export const getEntityHandler: Handler<
  Http.Campaign.GetEntity.Request,
  Http.Campaign.GetEntity.Response
> = async (params) => {
  const result = await dal.getOne(params)
  return jsonRpcResult({ ...result, status: result.status as Http.Campaign.GetEntity.Response['status'] })
}
