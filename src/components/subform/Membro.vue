<template>
  <q-card class="col-12" flat>
    <q-card-section class="row">
      <div class="q-pa-xs col-12">{{ label }}</div>
      <div class="q-pa-xs col-3">
        <InputRG v-model="register.rg" ref="rg" required/>
      </div>
      <div class="q-pa-xs col-3">
        <InputText label="Nome" :disable="disabled" v-model="register.nome" ref="nome" required/>
      </div>
      <div class="q-pa-xs col-3">
        <PostoGrad v-model="register.cargo" :disable="disabled" ref="cargo" required/>
      </div>
      <div class="q-pa-xs col-3">
         <q-btn-group spread>
          <!-- <q-btn :label="disabled ? 'Liberar' : 'Bloquear'" :icon=" disabled ? 'fa fa-lock' : 'fa fa-lock-open'" @click="disabled = !disabled"/>
          <q-btn v-if="requireds && register.id" label="Substituir" icon="fa fa-sync"/> -->
          <BtnStack :label="disabled ? 'Liberar' : 'Bloquear'" :icon=" disabled ? 'fa fa-lock' : 'fa fa-lock-open'" @click="disabled = !disabled"/>
          <BtnStack v-if="requireds && register.id" label="Substituir" icon="fa fa-sync" />
        </q-btn-group>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, watch } from '@vue/composition-api'
import { postograd } from 'src/config/selects'
import { validate } from 'src/libs/validator'
import { post, put } from 'src/libs/api'

import InputRG from 'components/form/InputRG.vue'
import InputText from 'components/form/InputText.vue'
import PostoGrad from 'components/form/PostoGrad.vue'
import BtnStack from 'components/form/BtnStack.vue'

const fields = ['rg', 'nome', 'cargo']

declare type Membro = {
  rg: string
  nome: string
  cargo: string
  situacao: string
}

export default defineComponent({
  name: 'Membro',
  components: {
    InputRG,
    InputText,
    PostoGrad,
    BtnStack,
  },
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
  },
  setup (props, { root, refs, emit }) {

    const vars: any = reactive({
      validable: false,
      register: {
        rg: '',
        nome: '',
        cargo: '',
        situacao: props.label
      } as Membro,
      _value: computed({
        get: () => props.value,
        set: value => emit('input', vars.isValid)
      }),
      disabled: true,
      postograd,
      isValid: computed(() => {
        if (!vars.validable) return true
        if (props.required && !vars.requireds) {
          return false
        }
        return true
      }),
      requireds: computed(() => Boolean(vars.register.rg) && Boolean(vars.register.nome) && Boolean(vars.register.cargo)),
      denseVal: computed(() => root.$store.state.configs.dense),   
    })

    const functions = {
      validate () {
        return validate(refs, fields)
      },
      handleSubmit () {
        if (this.validate()) {
          if (vars?.register?.id) this.update(vars?.register?.id)
          else this.create()
        }
      },
      async create () {
        return await post('envolvidos', vars.register, { silent: true })
      },
      async update (id: number) {
        return await put(`envolvidos/${id}`, vars.register, { silent: true })
      },
    }

    return {
      ...functions,
      ...toRefs(vars)
    }
  }
})
</script>