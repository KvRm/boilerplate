import { Pick, Static } from "@sinclair/typebox";
import { userDto } from "../../../dto";

export const request = Pick(userDto, ["id"]);

export type Request = Static<typeof request>;
