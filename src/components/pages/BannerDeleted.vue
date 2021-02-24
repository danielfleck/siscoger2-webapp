<template>
  <q-banner inline-actions class="bg-red text-white">
    {{ label }}
    <template v-slot:action>
      <q-btn flat color="white" label="Restaurar" icon="restore" @click="restore"/>
    </template>
  </q-banner>
</template>

<script>
import { defineComponent } from "@vue/composition-api"
import { api, confirm } from "src/services"

export default defineComponent({
  name: 'BannerDeleted',
  props: {
    label: {
      type: String,
      default: "REGISTRO APAGADO"
    },
    proc: {
      type: String,
      required: true
    },
    id: {
      required: true
    },
  },
  setup (props, { root }) {
    function restore () {
      const { proc, id } = props
      root.$q.dialog(confirm({ message: 'Tem certeza que deseja restaurar?', cancel: true })).onOk(async () => {
        const { ok } = await api.put(`${proc}/${id}/restore`, {})
        if (ok) void root.$router.push('/')
      })
    }
    return { 
      restore
    }
  }
})
</script>

<style>

</style>