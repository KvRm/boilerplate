<script setup lang="ts">
const route = useRoute()

const navItems = [
  { label: 'Кампании', routeName: ROUTE_NAMES.CAMPAIGN.INDEX },
  { label: 'Пользователи', routeName: ROUTE_NAMES.USER.INDEX },
]

function checkIsNavItemActive(routeName: string) {
  return route.matched.some(({ name }) => name === routeName)
}
</script>

<template>
  <div h-full flex>
    <aside relative z-2 w-60 border-r-1 border-grey-300>
      <div px-1 py-4>
        <div h-10 flex-v-center justify-between px-2>
          <div flex-v-center gap-2>
            <div h-7 w-7 rounded-full bg-black />
            <div>Иванов И. И.</div>
          </div>
          <button h-7 w-7 flex-center rounded hover:bg-grey-100>
            <div i-material-symbols:logout text-grey-600 />
          </button>
        </div>
      </div>

      <div flex="~ col" mt-2 h-full gap-0.5 px-1>
        <span px-2 text-lg font-800>Меню</span>
        <RouterLink
          v-for="navItem in navItems" :key="navItem.routeName" :to="{ name: navItem.routeName }"
          block w-full rounded hover:bg-grey-100 p-2
          :class="{ 'text-blue-300 bg-grey-200': checkIsNavItemActive(navItem.routeName) }"
        >
          {{ navItem.label }}
        </RouterLink>
      </div>
    </aside>
    <main flex-1 overflow-y-auto>
      <RouterView />
    </main>
  </div>
</template>
