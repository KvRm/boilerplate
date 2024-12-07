import * as Campaign from './campaign'
import * as User from './user'

export const methodList = {
  user: { ...User.methodList },
  campaign: { ...Campaign.methodList },
} as const

export type MethodPath =
  (typeof methodList)[keyof typeof methodList][keyof (typeof methodList)[keyof typeof methodList]]['path']
