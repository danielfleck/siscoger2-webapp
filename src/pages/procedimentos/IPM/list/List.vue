<template>
  <q-tab-panel name="list">
    <q-btn v-if="acl.hasAnyRoleOrPermission(ipmRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/ipm/inserir"/>
    <Table
      data-cy="table"
      label="Lista"
      :data="data"
      :columns="columns"
      actions
      :actionButtonDelete="acl.hasAnyRoleOrPermission(ipmRules.toDelete)"
      :actionButtonEdit="acl.hasAnyRoleOrPermission(ipmRules.toEdit)"
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
import { confirmMsg } from 'src/libs/dialog'
import { api, acl } from 'src/services'
import { Ipm, Columns } from 'src/types'
import { getOpmByCode } from 'src/utils'
import { ipmRules } from 'src/rules'
import { ipmRoute } from 'src/routenames'

export default defineComponent({
  name: 'List',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Ipm[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'cdopm', label: 'OPM', field: 'cdopm', format: (val) => getOpmByCode(val) },
        { name: 'sintese_txt', label: 'Síntese do fato', field: 'sintese_txt', align: 'left', style: 'white-space: pre-wrap' },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[],
      ipmRules
    })

    async function loadData () {
      const { data } = await api.get(`/${ipmRoute}/andamento`)
      vars.data = Object.freeze(data as Ipm[])
    }

    function onEdit (row: Ipm) {
      void root.$router.push(`/${ipmRoute}/editar/${row.id}`)
    }

    function onDelete (row: Ipm) {
      root.$q.dialog(confirmMsg).onOk(async () => {
        const { ok } = await api.delete(`${ipmRoute}/${row.id}`)
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
