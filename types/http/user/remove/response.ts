import { Static, Type } from "@sinclair/typebox";

export const response = Type.Object({ isSuccess: Type.Boolean() });

export type Response = Static<typeof response>;
