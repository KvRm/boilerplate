import type { Http } from 'types'
import type { Handler } from '../../setup'

import { jsonRpcResult } from '../../json-rpc'
import * as dal from '../dal'

export const getListHandler: Handler<
  Http.Campaign.GetList.Request,
  Http.Campaign.GetList.Response
> = async (params) => {
  const result = await dal.getMany(params)
  return jsonRpcResult(result)
}
