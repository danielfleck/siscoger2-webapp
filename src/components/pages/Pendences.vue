<template>
  <q-expansion-item :group="group" :content-inset-level="contentInsetLevel">
    <template v-slot:header>
      <q-item-section >
        {{ label }}
      </q-item-section>
    </template>
    <slot/>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Pendences',
  props: {
    group: {
      type: String,
      default: ''
    },

    contentInsetLevel: {
      type: Number,
      default: 0
    },

    icon: {
      type: String,
      default: ''
    },

    iconSize: {
      type: String,
      default: 'xs' //  'xs', 'sm', 'md', 'lg', 'xl'
    },

    label: {
      type: String,
      required: true
    }

  }
})
</script>
