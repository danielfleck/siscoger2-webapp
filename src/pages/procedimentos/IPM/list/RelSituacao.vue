<template>
  <q-tab-panel name="rel_situacao">
    <q-btn data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/ipm/inserir"/>
    <Table
      data-cy="table"
      label="Rel. Situação"
      :data="data"
      :columns="columns"
      actions
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
import { api } from 'src/services'
import { Ipm, Columns } from 'src/types'
import { getOpmByCode, changeDate } from 'src/filters'

export default defineComponent({
  name: 'RelSituacao',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Ipm[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'cdopm', label: 'OPM', field: 'cdopm', format: (val) => getOpmByCode(val), sortable: true },
        { name: 'fato', label: 'Fato', field: 'fato_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'abertura', label: 'Abertura', field: 'abertura_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'autuação', label: 'Autuação', field: 'autuacao_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'rel_enc', label: 'Rel. Enc', field: 'relato_enc_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'relato_cmtopm_data', label: 'Rel. OPM', field: 'relato_cmtopm_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'relato_cmtgeral_data', label: 'Sol. CG', field: 'sol_cmtgeral_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[]
    })
    async function loadData () {
      const { data } = await api.get('ipms')
      vars.data = Object.freeze(data as Ipm[])
    }

    function onEdit (row: Ipm) {
      void root.$router.push(`/ipm/editar/${row.id}`)
    }

    function onDelete (row: Ipm) {
      root.$q.dialog(confirmMsg).onOk(async () => {
        const { ok } = await api.delete(`ipms/${row.id}`)
        if (ok) void loadData()
      })
    }

    void loadData()

    return {
      ...toRefs(vars),
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
