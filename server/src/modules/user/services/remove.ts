import { Http } from "types";
import { Handler } from "../../setup";

import * as dal from "../dal";
import { jsonRpcResult } from "../../json-rpc";

export const removeHandler: Handler<
  Http.User.Remove.Request,
  Http.User.Remove.Response
> = async (params, reply) => {
  const result = await dal.removeOne(params);
  return jsonRpcResult({ isSuccess: !!result.id });
};
