import { Static, Type } from "@sinclair/typebox";
import { userDto } from "../../../dto";

export const request = Type.Omit(userDto, ["id", "createdAt", "updatedAt"], {
  additionalProperties: false,
});

export type Request = Static<typeof request>;
