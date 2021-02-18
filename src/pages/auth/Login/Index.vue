<template>
   <q-page class="window-height window-width row justify-center items-center">
     <!-- <q-icon name="img:logo-sem-fundo.png" size="100px"/> -->
    <div class="column">
      <div class="row">
        <div class="col-12">
          <div class="text-h4 text-white q-my-md">SISCOGER</div>
        </div>
      </div>
      <q-card bordered class="q-pa-lg">
        <Form />
        <Orientations />
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Orientations from './Orientations.vue'
import Form from './Form.vue'

const Login = defineComponent({
  name: 'Login',
  components: { Orientations, Form }
})

export default Login
</script>
