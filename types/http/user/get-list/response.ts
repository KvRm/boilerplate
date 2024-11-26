import { Static, Type } from "@sinclair/typebox";
import { userDto } from "../../../dto";

const user = Type.Omit(userDto, ["password"], { additionalProperties: false });

export const response = Type.Object({
  list: Type.Array(user),
  total: Type.Number(),
});

export type Response = Static<typeof response>;
