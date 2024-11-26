import * as User from "./user";

export const methodList = {
  user: {
    ...User.methodList,
  },
} as const;

export type MethodPath =
  (typeof methodList)[keyof typeof methodList][keyof (typeof methodList)[keyof typeof methodList]]["path"];
