<template>
  <q-tab-panel name="list">
    <q-btn v-if="acl.hasAnyRoleOrPermission(adlRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/adl/inserir"/>
    <Table
      data-cy="table"
      label="Lista"
      :data="data"
      :columns="columns"
      actions
      :actionButtonDelete="acl.hasAnyRoleOrPermission(adlRules.toDelete)"
      :actionButtonEdit="acl.hasAnyRoleOrPermission(adlRules.toEdit)"
      @delete="onDelete"
      @edit="onEdit"
    />
  </q-tab-panel>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-void */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

import Table from 'components/pages/Table.vue'
import { getMotivoConselho } from 'src/filters'
import { api, acl, confirmMsg, errorNotify } from 'src/services'
import { Adl, Columns } from 'src/types'
import { adlRules } from 'src/rules'
import { adlRoute } from 'src/routenames'

export default defineComponent({
  name: 'List',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Adl[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'motivo', label: 'Motivo', field: 'id_motivoconselho', format: (val) => getMotivoConselho(val) },
        { name: 'sintese_txt', label: 'Síntese do fato', field: 'sintese_txt', align: 'left', style: 'white-space: pre-wrap' },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[],
      adlRules
    })

    async function loadData () {
      const { data } = await api.get(adlRoute)
      vars.data = Object.freeze(data as Adl[])
    }

    function onEdit (row: Adl) {
      if (!row.id) return errorNotify('Sem id')
      void root.$router.push(`/${adlRoute}/editar/${row.id}`)
    }

    function onDelete (row: Adl) {
      if (!row.id) return errorNotify('Sem id')
      root.$q.dialog(confirmMsg).onOk(async () => {
        const { ok } = await api.delete(`${adlRoute}/${row.id}`)
        if (ok) void loadData()
      })
    }

    void loadData()

    return {
      ...toRefs(vars),
      acl,
      onEdit,
      onDelete
    }
  }
})
</script>

<style scoped>
.column-text {
  max-width: 500px;
  white-space: pre-wrap;
}
</style>
