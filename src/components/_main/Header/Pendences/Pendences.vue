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
import { defineComponent, ref, computed, reactive } from '@vue/composition-api'
import { LocalStorage } from 'quasar'
import { getPendences } from 'src/utils'

const HeadPendences = defineComponent({
  name: 'HeaderMenu',
  props: {
    label: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    }
  },
  setup (props, { root }) {
    const vars = reactive({
      qtd: computed(() => getPendences(props.label)),
      color: computed(() => functions.getColor())
    })

    const functions = {
      async getColor () {
        const qtd = getPendences(props.label)
        console.log(qtd)
        if (qtd <= 1) return 'positive'
        if (qtd <= 5) return 'amber'
        return 'negative'
      }
    }
    return {
      qtd: computed(() => getPendences(props.label)),
      color: computed(() => functions.getColor())
    }
  }
})
export default HeadPendences
</script>

<style >

</style>
