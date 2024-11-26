import { Http } from "types";
import { Handler } from "../../setup";
import { jsonRpcResult } from "../../json-rpc";

import * as dal from "../dal";

export const getEntityHandler: Handler<
  Http.User.GetEntity.Request,
  Http.User.GetEntity.Response
> = async (params, reply) => {
  const result = await dal.getOne(params);
  return jsonRpcResult(result);
};
