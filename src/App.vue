<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
declare module '@vue/composition-api' {
  interface SetupContext {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly refs: { [key: string]: Vue | Element | Vue[] | Element[] | any };
  }
}

export default defineComponent({
  name: 'App'
})
</script>
