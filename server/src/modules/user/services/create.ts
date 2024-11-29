import type { Http } from 'types'
import type { Handler } from '../../setup'

import { sha256 } from 'js-sha256'

import { jsonRpcResult } from '../../json-rpc'
import * as dal from '../dal'

export const createHandler: Handler<
  Http.User.Create.Request,
  Http.User.Create.Response
> = async (params) => {
  const hashedPassword = sha256(params.password)
  const result = await dal.createOne({ ...params, password: hashedPassword })
  return jsonRpcResult(result)
}
