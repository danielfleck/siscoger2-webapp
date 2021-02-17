<template>
  <q-layout view="hHh lpR fFf">
    <Header />
    <SideMenu />

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
import SideMenu from 'components/_main/SideMenu/Index.vue'
import Header from 'components/_main/Header/Index.vue'

import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'MainLayout',
  components: { SideMenu, Header }
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
