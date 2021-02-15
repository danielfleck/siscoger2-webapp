<template>
  <div>
    <q-item-label header>Sobre</q-item-label>
    <q-item clickable v-close-popup tabindex="0">
      <q-item-section>
        versão sistema: {{ version }}
      </q-item-section>
    </q-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { appVersion } from '../../../../config/app'

const About = defineComponent({
  name: 'About',
  setup () {
    const version = ref(appVersion)
    return {
      version
    }
  }
})

export default About
</script>

<style >

</style>
