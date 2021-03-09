import { Option } from './'

export const ofendidoTipo: Option[] = [
  { value: 'ofendido', label: '' },
  { value: 'ofendidoIt', label: 'Condutor Civil' },
  { value: 'ofendidoPad', label: 'Envolvido' },
  { value: 'ofendidoSai', label: '' },
  { value: 'ofendidoProc_outros', label: '' }
]

export const ofendidoSexo: Option[] = [
  { value: '', label: 'Escolha' },
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Feminino' }
]

export const ofendidoResultado: Option[] = [
  { value: 'Selecione', label: 'Selecione' },
  { value: 'Sem lesao', label: 'Sem lesao' },
  { value: 'Obito', label: 'Obito' },
  { value: 'Lesao corporal', label: 'Lesao corporal' }
]

export const ofendidoEscolaridade: Option[] = [
  { value: 'Analfabeto', label: 'Analfabeto' },
  { value: 'Fundamental Incompleto', label: 'Fundamental Incompleto' },
  { value: 'Fundamental Completo', label: 'Fundamental Completo' },
  { value: 'Médio Incompleto', label: 'Médio Incompleto' },
  { value: 'Médio completo', label: 'Médio completo' },
  { value: 'Superior incompleto', label: 'Superior incompleto' },
  { value: 'Superior completo', label: 'Superior completo' },
  { value: 'Pos - graduado', label: 'Pos - graduado' },
  { value: 'Mestrado', label: 'Mestrado' },
  { value: 'Doutorado', label: 'Doutorado' }
]

export const ofendidoSituacao: Option[] = [
  { value: 'Vítima', label: 'Vítima' },
  { value: 'Testemunha', label: 'Testemunha' },
  { value: 'Denunciante', label: 'Denunciante' }
]
