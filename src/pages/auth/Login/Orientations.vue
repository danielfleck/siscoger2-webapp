<template>
  <q-card-section class="text-center q-pa-none">
    <p class="text-grey-6">Não tem acesso ao sistema?</p>
    <p class="text-grey-6">
      Leia a Orientacao
      <a href="http://10.47.0.26/acesso/index.php/orientacoes" class="text-grey-8" style="text-decoration:none">002/2019/COGER</a>
      e envie um E-PROTOCOLO
    </p>
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

const OrientationsLogin = defineComponent({
  name: 'OrientationsLogin'
})

export default OrientationsLogin
</script>
