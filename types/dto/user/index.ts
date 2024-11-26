import { Type, Static } from "@sinclair/typebox";

export const userDto = Type.Object({
  id: Type.Number(),
  
  firstName: Type.String(),
  lastName: Type.String(),
  secondName: Type.Union([Type.Null(), Type.String()]),
  email: Type.String(),
  password: Type.String(),

  createdAt: Type.Date(),
  updatedAt: Type.Date(),
}, { additionalProperties: false });

export type UserDto = Static<typeof userDto>;
