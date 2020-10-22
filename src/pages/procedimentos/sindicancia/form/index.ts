import { defineComponent, reactive, computed, toRefs } from '@vue/composition-api'


const bread = [{ label: 'Sindicância', link: '/sindicancia' }]
import { localePTBR } from 'src/config/app'
import { andamentoSindicancia, andamentoCogerSindicancia, tipoBoletim, prorogacao, motivoAberturaSindicancia } from 'src/config/selects'
import { opms } from 'src/config/opms'

export const vars = reactive({
  step: 1,
  tab: 'main',
  loading: false,
  sindicante: false,
  register: {
    id: 0,
    sintese_txt: null,
    prioridade: false,
    id_andamento: 6,
    id_andamentocoger: null,
    motivo_cancelamento: null,
    doc_origem_txt: null,
    fato_data: null,
    cdopm: null,
    portaria_numero: null,
    portaria_data: null,
    doc_tipo: null,
    doc_numero: null,
    abertura_data: null,
    prorogacao: null,
    prorogacao_dias: 0,
    motivo_abertura: '',
    motivo_outros: '',
    completo: 0
  },
  breadcrumbs: bread,
  localePTBR,
  andamentoSindicancia,
  andamentoCogerSindicancia,
  motivoAberturaSindicancia,
  tipoBoletim,
  prorogacao,
  opms,
  hasSindicante: false,
  onSubmit: false
})

