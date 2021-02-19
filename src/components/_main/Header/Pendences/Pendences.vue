<template>
  <q-item clickable v-close-popup :to="link">
    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
      <q-item-label caption>{{ qtd }} Pendências</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-icon name="info" :color="color" />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

const HeadPendences = defineComponent({
  name: 'HeaderMenu',
  props: {
    label: {
      type: String,
      default: ''
    },
    qtd: {
      type: Number,
      default: 0
    },
    link: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const functions = {
      getColor () {
        const qtd = props.qtd
        if (qtd <= 1) return 'positive'
        if (qtd <= 5) return 'amber'
        return 'negative'
      }
    }
    return {
      color: computed(() => functions.getColor())
    }
  }
})
export default HeadPendences
</script>

<style >

</style>
