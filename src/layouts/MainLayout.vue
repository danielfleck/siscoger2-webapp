<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs" to="/">
          <q-icon name="img:logo-sem-fundo.png" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold">
            {{ name }}
          </q-toolbar-title>
        </q-btn>
        <q-space />

        <SearchBar />
        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
        <header-menu/>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :content-class="$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-10'"
    >
      <side-menu/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import SideMenu from 'components/_main/SideMenu.vue'
import HeaderMenu from 'components/_main/HeaderMenu.vue'
import SearchBar from 'components/_main/SearchBar.vue'

import { defineComponent, ref } from '@vue/composition-api'
import { appName, appVersion } from '../config/app'

export default defineComponent({
  name: 'MainLayout',
  components: { SideMenu, HeaderMenu, SearchBar },
  setup () {
    const leftDrawerOpen = ref(false)
    const version = ref(appVersion)
    const name = ref(appName)
    const search = ref('')
    return { leftDrawerOpen, version, name, search }
  }
})
</script>

<style lang="sass">
.SML
  &__toolbar-input-container
    min-width: 100px
    width: 55%
  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
</style>
