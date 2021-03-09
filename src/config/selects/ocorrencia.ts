import { Option } from './'

export const situacaoOCOR: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 1, label: 'Em serviço ou atendimento de ocorrência' },
  { value: 2, label: 'Fora de serviço ou outras circunstâncias' }
]

export const situacaoServicoOuFora: Option[] = [
  { value: 1, label: 'Em serviço ou atendimento de Ocorrência' },
  { value: 2, label: 'Fora do Serviço ou outras circunstâncias' }
]

export const respCivil: Option[] = [
  { value: 0, label: 'Indefinida Culpa' },
  { value: 1, label: 'Civil' },
  { value: 2, label: 'Militar' },
  { value: 3, label: 'Ente estatal' },
  { value: 4, label: 'PJ - Direito privado' },
  { value: 5, label: 'Terceiro' }
]
