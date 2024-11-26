import { Http } from "types";
import { Handler } from "../../setup";

import * as dal from "../dal";
import { jsonRpcResult } from "../../json-rpc";

export const getListHandler: Handler<
  Http.User.GetList.Request,
  Http.User.GetList.Response
> = async (params, reply) => {
  const result = await dal.getMany(params);
  return jsonRpcResult(result);
};
