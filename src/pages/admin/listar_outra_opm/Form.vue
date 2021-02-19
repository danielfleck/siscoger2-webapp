<template>
  <page :breadcrumbs="[
    { label: 'Mudar listagem', link: '/admin/listar_outra_opm' },
    ]">
      <form class="row">
        <div class="q-pa-md col-12">
          <OPM v-model="register.cdopm" required ref="cdopm"/>
        </div>
      </form>
      <q-btn
        @click="change"
        color="positive"
        label="Mudar"
        class="full-width"
        icon="fa fa-sync"
      />
  </page>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

import Page from 'components/pages/Page.vue'

import { validate } from 'src/services'
import OPM from 'src/components/form/OPM.vue'

const fields = ['cdopm']

export default defineComponent({
  name: 'Form',
  components: {
    Page,
    OPM
  },
  setup (_, { refs, root }) {
    const vars = reactive({
      register: {
        cdopm: ''
      }
    })

    const functions = {
      change () {
        if (validate(refs, fields)) {
          return root.$router.push(`/?cdopm=${vars.register.cdopm}`)
        }
      }
    }
    return {
      ...toRefs(vars),
      ...functions
    }
  }
})
</script>
