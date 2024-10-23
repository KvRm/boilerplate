import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { campaignRoutes } from './campaign'

export const routes: RouteRecordRaw[] = [
  ...campaignRoutes,
  { path: '/:catchAll(.*)*', redirect: { name: ROUTE_NAMES.CAMPAIGN.INDEX } },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition)
      return savedPosition
  },
  routes,
})
