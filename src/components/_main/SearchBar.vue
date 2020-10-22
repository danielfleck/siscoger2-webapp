<template>
    <div class="SML__toolbar-input-container row no-wrap">
        <q-input dense outlined square v-model="search" :placeholder="searchType" class="col" :class="$q.dark.isActive ? '' : 'bg-white'"/>
        <q-btn-dropdown
        class="SML__toolbar-input-btn"
        color="grey-3"
        text-color="grey-8"
        icon="search"
        unelevated
        >
        <q-list>
            <q-item clickable v-close-popup @click="type = 'name'">
            <q-item-section>
                <q-item-label>Nome</q-item-label>
            </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="type = 'rg'">
            <q-item-section>
                <q-item-label>RG</q-item-label>
            </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="type = 'proc'">
            <q-item-section>
                <q-item-label>Processo/Procedimento</q-item-label>
            </q-item-section>
            </q-item>
        </q-list>

        </q-btn-dropdown>
        <!-- <q-btn class="SML__toolbar-input-btn" color="grey-3" text-color="grey-8" icon="search" unelevated /> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from '@vue/composition-api'
export default defineComponent({
  name: 'SearchBar',
  setup () {
    const vars = reactive({
      search: '',
      type: 'name',
      searchType: computed(() => {
        if (vars.type === 'name') return 'Busca por nome'
        if (vars.type === 'rg') return 'Busca por RG'
        if (vars.type === 'proc') return 'Busca por Processo/Procedimento'
      })
    })
    return {
      ...toRefs(vars)
    }
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
