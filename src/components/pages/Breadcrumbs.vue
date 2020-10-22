<template>
  <q-breadcrumbs align="left">
    <q-breadcrumbs-el icon="home" to="/" />
      <!-- <template v-if="breadcrumbs.lenght"> -->
        <q-breadcrumbs-el v-for="breadcrumb in breadcrumbs" :label="breadcrumb.label" :to="breadcrumb.link" :key="breadcrumb.label"/>
      <!-- </template> -->
  </q-breadcrumbs>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, toRef, Ref } from '@vue/composition-api'

interface BreadcrumbsInterface {
  label: string;
  link: string;
}

function useBreadcrumbs (todos: Ref<BreadcrumbsInterface[]>) {
  const todoCount = computed(() => todos.value.length)
  return { todoCount }
}

export default defineComponent({
  name: 'Breadcrumbs',
  props: {
    breadcrumbs: {
      type: (Array as unknown) as PropType<BreadcrumbsInterface[]>,
      default: () => []
    }
  },
  setup (props) {
    return { ...useBreadcrumbs(toRef(props, 'breadcrumbs')) }
  }
})
</script>
