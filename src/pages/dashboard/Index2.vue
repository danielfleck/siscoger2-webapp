<template>
  <page>
    <div class="q-pa-none row q-gutter-none">
      <info-box label='FATD' icon='fa fa-balance-scale' :value='0'/>
      <info-box label='IPM' icon='fa fa-university' bg='bg-teal-3' :value='0'/>
      <info-box label='Sindicância' icon='fa fa-search' bg="bg-amber-3" :value='0'/>
      <info-box label='CD' icon='fa fa-gavel' bg='bg-red-3' :value='0'/>
    </div>
    <div class="q-pa-md row">
      <q-list bordered class="rounded-borders col-12">
        <pendences group="dashboard" label="Transferências">
          <q-card>
            <q-card-section>
              <q-table
              title="Transferências"
              :data="data"
              :columns="columns"
              :filter="filter"
            />
            </q-card-section>
          </q-card>
        </pendences>
        <q-separator />
        <pendences group="dashboard" label="Comportamento">
          <q-card>
            <q-card-section>
              <q-table
              title="Comportamento"
              :data="data"
              :columns="columns"
              :filter="filter"
            />
            </q-card-section>
          </q-card>
        </pendences>
        <q-separator />
        <pendences group="dashboard" label="FATD - DATA DE ABERTURA">
          <q-card>
            <q-card-section>
              <q-table
              title="FATD - DATA DE ABERTURA"
              :data="data"
              :columns="columns"
              :filter="filter"
            />
            </q-card-section>
          </q-card>
        </pendences>
        <q-separator />
        <pendences group="dashboard" label="FATD - PRAZOS">
          <q-card>
            <q-card-section>
              <q-table
              title="FATD - PRAZOS"
              :data="data"
              :columns="columns"
              :filter="filter"
            />
            </q-card-section>
          </q-card>
        </pendences>
        <q-separator />
        <pendences group="dashboard" label="FATD - PUNIÇÃO">
          <q-card>
            <q-card-section>
              <q-table
              title="FATD - PUNIÇÃO"
              :data="data"
              :columns="columns"
              :filter="filter"
            />
            </q-card-section>
          </q-card>
        </pendences>
        <q-separator />
        <pendences group="dashboard" label="IPM - DATA DE INSTAURAÇÃO">
          <q-card>
            <q-card-section>
              <q-table
              title="IPM - DATA DE INSTAURAÇÃO"
              :data="data"
              :columns="columns"
              :filter="filter"
            />
            </q-card-section>
          </q-card>
        </pendences>
        <q-separator />
        <pendences group="dashboard" label="IPM - PRAZOS">
          <q-card>
            <q-card-section>
              <q-table
              title="IPM - PRAZOS"
              :data="data"
              :columns="columns"
              :filter="filter"
            />
            </q-card-section>
          </q-card>
        </pendences>
        <q-separator />
        <pendences group="dashboard" label="SINDICÂNCIA - DATA DE ABERTURA">
          <q-card>
            <q-card-section>
              <q-table
              title="SINDICÂNCIA - DATA DE ABERTURA"
              :data="data"
              :columns="columns"
              :filter="filter"
            />
            </q-card-section>
          </q-card>
        </pendences>
        <q-separator />
        <pendences group="dashboard" label="SINDICÂNCIA - PRAZOS">
          <q-card>
            <q-card-section>
              <q-table
              title="SINDICÂNCIA - PRAZOS"
              :data="data"
              :columns="columns"
              :filter="filter"
            />
            </q-card-section>
          </q-card>
        </pendences>
        <q-separator />
        <pendences group="dashboard" label="SINDICÂNCIA - DATA DE ABERTURA">
          <q-card>
            <q-card-section>
              <q-table
              title="SINDICÂNCIA - DATA DE ABERTURA"
              :data="data"
              :columns="columns"
              :filter="filter"
            />
            </q-card-section>
          </q-card>
        </pendences>
        <q-separator />
        <pendences group="dashboard" label="CONSELHOS DE DISCIPLINA - DATA DE ABERTURA">
          <q-card>
            <q-card-section>
              <q-table
              title="CONSELHOS DE DISCIPLINA - DATA DE ABERTURA"
              :data="data"
              :columns="columns"
              :filter="filter"
            />
            </q-card-section>
          </q-card>
        </pendences>
        <q-separator />
        <pendences group="dashboard" label="CONSELHOS DE DISCIPLINA - PRAZOS">
          <q-card>
            <q-card-section>
              <q-table
              title="CONSELHOS DE DISCIPLINA - PRAZOS"
              :data="data"
              :columns="columns"
              :filter="filter"
            />
            </q-card-section>
          </q-card>
        </pendences>
        <q-separator />
      </q-list>
    </div>
  </page>
</template>

<script lang="ts">
import Page from 'components/pages/Page.vue'
import Table from 'components/pages/Table.vue'
import InfoBox from 'components/pages/InfoBox.vue'
import Pendences from 'components/pages/Pendences.vue'

import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'PageIndex',
  components: { Page, InfoBox, Pendences, Table }
})
</script>
