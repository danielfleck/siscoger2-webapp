import { Option } from './'

export const resultadoAcusado: Option[] = [
  { value: '', label: 'Selecione' },
  { value: 'Em andamento', label: 'Em andamento' },
  { value: 'Excluído', label: 'Excluído' },
  { value: 'Punido', label: 'Punido' },
  { value: 'Absolvido', label: 'Absolvido' },
  { value: 'Perda objeto', label: 'Perda objeto' },
  { value: 'Prescrição', label: 'Prescrição' },
  { value: 'Reintegrado/Reinserido', label: 'Reintegrado/Reinserido' },
  { value: 'FATD', label: 'FATD' },
  { value: 'Conselho Just.', label: 'Conselho Just.' },
  { value: 'Conselho Disc.', label: 'Conselho Disc.' },
  { value: 'Arquivamento', label: 'Arquivamento' },
  { value: 'IPM', label: 'IPM' },
  { value: 'Sindicância', label: 'Sindicância' },
  { value: 'ADL', label: 'ADL' },
  { value: 'Ind. Crime', label: 'Ind. Crime' },
  { value: 'Ind. Crime/FATD', label: 'Ind. Crime/FATD' },
  { value: 'At. Origem', label: 'At. Origem' },
  { value: 'Outros', label: 'Outros' },
  { value: 'CPP', label: 'CPP' },
  { value: 'CPO', label: 'CPO' },
  { value: 'Com. Mérito', label: 'Com. Mérito' },
  { value: 'Não há indícios', label: 'Não há indícios' },
  { value: 'Indícios de crime', label: 'Indícios de crime' },
  { value: 'Indícios de transgressão', label: 'Indícios de transgressão' },
  { value: 'Indícios de crime e transgressão', label: 'Indícios de crime e transgressão' },
  { value: 'Punido', label: 'Punido' },
  { value: 'Absolvido', label: 'Absolvido' },
  { value: 'Outra medida', label: 'Outra medida' },
  { value: 'Anulado', label: 'Anulado' }
]

export const resultadoCJ: Option[] = [
  { value: 3, label: 'Excluído' },
  { value: 4, label: 'Punido' },
  { value: 5, label: 'Absolvido' },
  { value: 26, label: 'Perda objeto' },
  { value: 27, label: 'Prescricao' }
]

export const resultadoCD: Option[] = [
  { value: 6, label: 'Excluído' },
  { value: 7, label: 'Punido' },
  { value: 8, label: 'Absolvido' },
  { value: 24, label: 'Perda objeto' },
  { value: 25, label: 'Prescricao' }
]

export const resultadoADL: Option[] = [
  { value: 9, label: 'Excluído' },
  { value: 10, label: 'Punido' },
  { value: 11, label: 'Absolvido' },
  { value: 28, label: 'Perda objeto' },
  { value: 29, label: 'Prescricao' }
]

export const resultadoSindicancia: Option[] = [
  { value: 12, label: 'FATD' },
  { value: 13, label: 'Conselho Just.' },
  { value: 14, label: 'Conselho Disc.' },
  { value: 15, label: 'Arquivamento' },
  { value: 16, label: 'IPM' },
  { value: 17, label: 'Sindicancia' },
  { value: 20, label: 'ADL' },
  { value: 30, label: 'Ind. Crime' },
  { value: 31, label: 'Ind. Crime/FATD' },
  { value: 32, label: 'At. Origem' },
  { value: 33, label: 'Outros' },
  { value: 34, label: 'CPP' },
  { value: 35, label: 'CPO' },
  { value: 36, label: 'COM. MERITO' }
]

export const resultadoIPM: Option[] = [
  { value: 18, label: 'Nao ha indicios' },
  { value: 19, label: 'Indicios Crime' },
  { value: 21, label: 'Indicios Transgressao' },
  { value: 22, label: 'Ind. Crime Transg.' }
]
