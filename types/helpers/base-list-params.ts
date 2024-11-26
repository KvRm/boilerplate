import { TEnum, Type } from "@sinclair/typebox";

export function getBaseListParams<T extends Record<string, string | number>>(
  orderFields: TEnum<T>
) {
  return {
    limit: Type.Number({ maximum: 1000 }),
    offset: Type.Number(),
    order: Type.Optional(
      Type.Object({
        field: orderFields,
        direction: Type.Union([Type.Literal("ASC"), Type.Literal("DESC")]),
      })
    ),
  };
}
