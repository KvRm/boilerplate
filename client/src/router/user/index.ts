import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAMES } from '~/router/route-names'

export const userRoutes: Array<RouteRecordRaw> = [
  {
    path: '/user',
    name: ROUTE_NAMES.USER.INDEX,
    component: () => import('~/layouts/default.vue'),
    redirect: { name: ROUTE_NAMES.USER.LIST },
    children: [
      {
        path: 'list',
        name: ROUTE_NAMES.USER.LIST,
        component: () => import('~/pages/user/list.vue'),
      },
      {
        path: `detail/:${URL_PARAMS_KEYS.USER_DETAIL_ID}`,
        name: ROUTE_NAMES.USER.DETAIL,
        component: () => import('~/pages/user/detail.vue'),
      },
    ],
  },
]
