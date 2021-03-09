import { Option } from './'

export const ClassificacaoSigilo: Option[] = [
  { value: 1, label: 'Publico' },
  { value: 2, label: 'Usuário Siscoger' },
  { value: 3, label: 'Reservado - SDJ/Pares/Superiores' },
  { value: 4, label: 'Reservado - Somente o próprio' },
  { value: 5, label: 'Reservado - SJD/Próprio' }
]

export const Condicao: Option[] = [
  { value: 1, label: 'Testemunha' },
  { value: 2, label: 'Juiz Militar - Conselho Permanente' },
  { value: 3, label: 'Juiz Militar - Conselho Especial' },
  { value: 4, label: 'Réu' },
  { value: 5, label: 'Testemunha de Defesa' },
  { value: 6, label: 'Testemunha da Denúncia' },
  { value: 7, label: 'Testemunha de Acusação' },
  { value: 8, label: 'Testemunha do Juízo' },
  { value: 9, label: 'Outro' },
  { value: 10, label: 'Não informado' }
]

export const Notificacao: Option[] = [
  { value: 1, label: 'Pendente' },
  { value: 2, label: 'Notificado' },
  { value: 3, label: 'Não notificado' }
]

export const Situacao: Option[] = [
  { value: 1, label: 'Prevista' },
  { value: 2, label: 'Compareceu/Realizada' },
  { value: 3, label: 'Compareceu/Cancelada' },
  { value: 4, label: 'Compareceu/Redesignada' },
  { value: 5, label: 'Não compareceu' },
  { value: 6, label: 'Não compareceu/Justificado' },
  { value: 7, label: 'Redesignada' },
  { value: 8, label: 'Substituído (Cons. VAJME)' },
  { value: 9, label: 'Ag. Publicação' },
  { value: 10, label: 'Apagada' }
]

export const TipoProcesso: Option[] = [
  { value: 1, label: 'Ação Penal' },
  { value: 2, label: 'Ação Civil' },
  { value: 3, label: 'Não informado' },
  { value: 4, label: 'Não se aplica' },
  { value: 5, label: 'PM-IPM' },
  { value: 6, label: 'PM-Sindicância' },
  { value: 7, label: 'PM-FATD' },
  { value: 8, label: 'PM-Inquérito Técnico' },
  { value: 9, label: 'PM-CJ' },
  { value: 10, label: 'PM-CD' },
  { value: 11, label: 'PM-ADL' },
  { value: 12, label: 'PM-ISO' },
  { value: 13, label: 'PM-PAD' },
  { value: 14, label: 'PM-Outro ' },
  { value: 15, label: 'Poder Judiciário ' },
  { value: 16, label: 'Inquérito Policial' },
  { value: 17, label: 'VAJME' }
]

export const tipoNotaComparecimento: Option[] = [
  { value: 1, label: 'Apresentação em Juízo/Delegacias' },
  { value: 2, label: 'VAJME - Conselho Especial' },
  { value: 3, label: 'VAJME - Conselho Permanente' },
  { value: 4, label: 'VAJME - Audiências' }
]
