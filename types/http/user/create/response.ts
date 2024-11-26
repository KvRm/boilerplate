import { Pick, Static } from "@sinclair/typebox";
import { userDto } from "../../../dto";

export const response = Pick(userDto, ['id']);

export type Response = Static<typeof response>;
