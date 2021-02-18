<template>
  <q-page class="window-height window-width row justify-center items-center">
     <!-- <q-icon name="img:logo-sem-fundo.png" size="100px"/> -->
    <div class="col-6">
      <div>
        <div class="col-8">
          <div class="text-h4 text-white q-my-md">SISCOGER</div>
          <div class="text-h5 text-white q-my-md">Termos de uso</div>
        </div>
      </div>
      <q-card bordered>
        <q-card-section class="q-pa-md">
          <q-virtual-scroll
            style="max-height: 300px;"
            :items="terms"
            class="text-dark"
            @virtual-scroll="hasReadTerms"
          >
            <template v-slot="{ item, index }">
              <q-item
                :key="index"
                dense
              >
                <q-item-section>
                  <q-item-label>
                    <q-badge class="shadow-1">
                    {{  index + 1 }}
                  </q-badge> - {{ item.label }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-virtual-scroll>
          <q-tooltip v-if="!readTerms">
            Leia os termos até o final para liberar o checkbox
          </q-tooltip>
          <q-checkbox :disable="!readTerms" v-model="checkTerms" label="Li e aceito os termos" class="text-dark"/>
          <q-btn :disable="!checkTerms" data-cy="button" color="light-blue-7" class="full-width" label="Enviar" @click="send" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
interface Terms {
  label: string
}
const maxSize = 15
const terms: Terms[] = []

for (let i = 0; i < maxSize; i++) {
  terms.push({
    label: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.'
  })
}

Object.freeze(terms)

import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import { api, setUser, successNotify } from 'src/services'
import { User } from 'src/types/user'
import { getUser } from 'src/utils'

interface Details {
  index: number
  from: number
  to: number
  direction: string
  ref: Record<string, unknown>
}

const Terms = defineComponent({
  name: 'Terms',
  setup (_, { root }) {
    const vars = reactive({
      readTerms: false,
      checkTerms: false,
      terms: terms
    })

    const functions = {
      hasReadTerms ({ index, to }: Details) {
        if (index === to) vars.readTerms = true
        else vars.readTerms = false
      },
      async send () {
        const user = getUser()
        const { data, ok } = await api.put(`users/${String(user.id)}`, { ...user, terms: true })

        if (ok) {
          const user = data as User
          setUser(user)
          successNotify(`Bem vindo ${user.name}!`)
          return root.$router.push('/')
        }
      }
    }

    return {
      ...toRefs(vars),
      ...functions
    }
  }
})

export default Terms

</script>

<style>

</style>
