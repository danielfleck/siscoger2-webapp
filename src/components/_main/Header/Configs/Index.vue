<template>
  <q-btn-dropdown stretch flat dropdown-icon="fas fa-cogs">
    <q-list>
      <q-item-label header>Configurações</q-item-label>
      <CompactForm />
      <AdvancedOptions />
      <DarkMode />
      <q-separator/>
     <About />
    </q-list>
  </q-btn-dropdown>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import CompactForm from './CompactForm.vue'
import AdvancedOptions from './AdvancedOptions.vue'
import DarkMode from './DarkMode.vue'
import About from './About.vue'

const Configs = defineComponent({
  name: 'Configs',
  components: {
    AdvancedOptions,
    CompactForm,
    DarkMode,
    About
  }
})
export default Configs
</script>

<style >

</style>
