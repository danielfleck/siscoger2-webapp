<template>
  <q-item
    clickable
    tag="a"
    :to="link"
    :active="active === title"
    @click="changeActive"
    active-class="active-item"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" :size="iconSize"/>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>
          {{ caption }}
        </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

export default defineComponent({
  name: 'MenuItem',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: 'far fa-circle'
    },

    iconSize: {
      type: String,
      default: 'xs'
      //  'xs', 'sm', 'md', 'lg', 'xl'
    }
  },
  setup (props) {
    const vars = reactive({
      active: ''
    })
    const functions = {
      changeActive () {
        vars.active = props.title
      }
    }
    return { 
      ...toRefs(vars),
      ...functions
     }
  }
})
</script>

<style lang="sass">
.active-item
  color: white
  background: #1976D2
</style>
