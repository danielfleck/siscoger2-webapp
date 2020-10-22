import { ref } from '@vue/composition-api'
export const opms = ref([
  { value: '0000000000', label: 'CG' },
  { value: '0010000000', label: 'CG/GAB' },
  { value: '0010000100', label: 'PMPR/OUVIDORIA' },
  { value: '0010000300', label: 'FASPM' },
  { value: '0010100000', label: 'AJGER' },
  { value: '0010100100', label: 'AG1' },
  { value: '0010100101', label: 'AG1/BOLETIM' },
  { value: '0010100102', label: 'AG1/ARQUIVO' },
  { value: '0010100103', label: 'AG1/PROTOCOLO' },
  { value: '0010100104', label: 'AJGER/AG1/MH' },
  { value: '0010100200', label: 'AG2/SA' }
])
