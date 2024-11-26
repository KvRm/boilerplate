import { Http } from "types";
import { Handler } from "../../setup";

import * as dal from "../dal";
import { jsonRpcResult } from "../../json-rpc";

export const updateHandler: Handler<
  Http.User.Update.Request,
  Http.User.Update.Response
> = async (params, reply) => {
  const result = await dal.updateOne(params);
  return jsonRpcResult(result);
};
