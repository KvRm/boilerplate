import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAMES } from '~/router/route-names'

export const campaignRoutes: Array<RouteRecordRaw> = [
  {
    path: '/campaign',
    name: ROUTE_NAMES.CAMPAIGN.INDEX,
    component: () => import('~/layouts/default.vue'),
    redirect: { name: ROUTE_NAMES.CAMPAIGN.LIST },
    children: [
      {
        path: 'list',
        name: ROUTE_NAMES.CAMPAIGN.LIST,
        component: () => import('~/pages/campaign/list.vue'),
      },
      {
        path: `detail/:${URL_PARAMS_KEYS.CAMPAIGN_DETAIL_ID}`,
        name: ROUTE_NAMES.CAMPAIGN.DETAIL,
        component: () => import('~/pages/campaign/detail.vue'),
      },
    ],
  },
]
