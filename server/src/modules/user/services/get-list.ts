import type { Http } from 'types'
import type { Handler } from '../../setup'

import { jsonRpcResult } from '../../json-rpc'
import * as dal from '../dal'

export const getListHandler: Handler<
  Http.User.GetList.Request,
  Http.User.GetList.Response
> = async (params) => {
  const result = await dal.getMany(params)
  return jsonRpcResult(result)
}
