<template>
  <div class="text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        <!-- <q-icon name="img:icons/icons/under-construction.svg"/> -->
        <q-icon name="img:icons/icons/wrench.svg"/>
      </div>

      <div class="text-h2" style="opacity:.4">
        Página em construção
      </div>

      <q-btn
        class="q-mt-xl"
        rounded
        text-color="blue"
        size="lg"
        to="/"
        label="<- Voltar para Home"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Error404'
})
</script>
