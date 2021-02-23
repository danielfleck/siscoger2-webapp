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
                    <q-badge v-if="item.badge" >
                    {{  item.badge }}
                    </q-badge> 
                  {{ item.label }}
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
  badge?: string
  label: string
}

const terms: Terms[] = [
  { label: 'DECLARO estar ciente da habilitação que me foi conferida, da responsabilidade de obedecer às disposições referentes ao controle de acesso aos sistemas informatizados da Polícia Militar do Estado do Paraná e de estar sujeito às penalidades cabíveis pela não-observância dos compromissos assumidos.' },
  { label: 'Comprometo-me a:' },
  { badge: 'a)', label: 'zelar pelo sigilo absoluto de minha senha;' },
  { badge: 'b)', label: 'zelar pela integridade e confidencialidade das informações inseridas ou consultadas;' },
  { badge: 'c)', label: 'acessar os sistemas informatizados da SJD, somente por necessidade de serviço ou por determinação expressa de superior hierárquico, mantendo registro de tal fato;' },
  { badge: 'd)', label: 'não revelar fato ou informação de qualquer natureza de que tenha conhecimento por força de minhas atribuições, salvo em decorrência de decisão competente na esfera administrativa ou judicial, bem como de autoridade superior;' },
  { badge: 'e)', label: 'manter a absoluta cautela quando da exibição de dados em tela, impressora ou, ainda, na gravação em meios eletrônicos, a fim de evitar que deles venham a tomar ciência pessoas não autorizadas;' },
  { badge: 'f)', label: 'não me ausentar do terminal sem encerrar a sessão de uso do sistema, garantindo assim a impossibilidade de acesso indevido por pessoas não autorizadas;' },
  { badge: 'g)', label: 'solicitar o imediato cancelamento da chave e senha quando não for mais utilizada, por ter sido transferido da seção de Justiça e Disciplina para outro local de trabalho ou reserva;' },
  { badge: 'h)', label: 'reportar imediatamente à chefia ou ao Administrador do Sistema, em caso de violação, acidental ou não, da sua senha, providenciando a sua substituição;' },
  { badge: 'i)', label: 'de maneira alguma ou sob qualquer pretexto, tentar descobrir senhas de outras pessoas;' },
  { badge: 'j)', label: 'somente utilizar o acesso para os fins designados e para os quais estiver devidamente autorizado, em razão das suas funções;' },
  { badge: 'k)', label: 'responder, em todas as instâncias, pelas conseqüências das ações ou omissões de minha parte que possam por em risco ou comprometer a exclusividade de conhecimento da minha senha ou das transações as quais esteja habilitado; e' },
  { badge: 'l)', label: 'observar o disposto no Decreto Federal nº. 4.553/2002, em especial o contido no artigo 37, § 1º.' },
  { label: '' },
  { label: 'Declaro ainda, estar ciente das determinações acima, compreendendo que quaisquer descumprimentos dessas regras podem implicar na aplicação das sanções disciplinares cabíveis e que o sistema manterá histórico de todos os acessos e consultas realizadas, permitindo auditoria sobre a chave utilizada.' },
  { label: 'A inexatidão das declarações desta comunicação ou a violação destas implicará nas sanções previstas no Código Penal Militar.' }
]

Object.freeze(terms)

import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import { api, setUser, successNotify } from 'src/services'
import { User } from 'src/types'
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
          return root.$router.push('/modificar_senha')
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
