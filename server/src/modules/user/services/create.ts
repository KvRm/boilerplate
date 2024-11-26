import { Http } from "types";
import { sha256 } from "js-sha256";

import { Handler } from "../../setup";

import * as dal from "../dal";
import { jsonRpcResult } from "../../json-rpc";

export const createHandler: Handler<
  Http.User.Create.Request,
  Http.User.Create.Response
> = async (params, reply) => {
  const hashedPassword = sha256(params.password);
  const result = await dal.createOne({ ...params, password: hashedPassword });
  return jsonRpcResult(result);
};
