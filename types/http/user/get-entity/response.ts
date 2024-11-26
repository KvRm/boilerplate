import { Static, Type } from "@sinclair/typebox";
import { userDto } from "../../../dto";

export const response = Type.Omit(userDto, ["password"], { additionalProperties: false });

export type Response = Static<typeof response>;
