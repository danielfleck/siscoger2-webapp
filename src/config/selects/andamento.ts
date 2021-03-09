import { Option } from './'

export const andamentoFATD: Option[] = [
  { value: 1, label: 'ANDAMENTO' },
  { value: 2, label: 'CONCLUÍDO' },
  { value: 3, label: 'SOBRESTADO' },
  { value: 34, label: 'ANÁLISE DO CMT' }
]

export const andamentoIPM: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 4, label: 'ANDAMENTO' },
  { value: 5, label: 'CONCLUÍDO' },
  { value: 35, label: 'ANÁLISE DO CMT' }
]

export const andamentoSindicancia: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 6, label: 'ANDAMENTO' },
  { value: 7, label: 'CONCLUÍDO' },
  { value: 8, label: 'SOBRESTADO' },
  { value: 36, label: 'ANÁLISE DO CMT' }
]

export const andamentoCD: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 9, label: 'ANDAMENTO' },
  { value: 10, label: 'CONCLUÍDO' },
  { value: 11, label: 'SOBRESTADO' },
  { value: 37, label: 'ANÁLISE DO CMT' }
]

export const andamentoCJ: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 12, label: 'ANDAMENTO' },
  { value: 13, label: 'CONCLUÍDO' },
  { value: 14, label: 'SOBRESTADO' },
  { value: 38, label: 'ANÁLISE DO CMT' }
]

export const andamentoADL: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 15, label: 'ANDAMENTO' },
  { value: 16, label: 'CONCLUÍDO' },
  { value: 17, label: 'SOBRESTADO' },
  { value: 39, label: 'ANÁLISE DO CMT' }
]

export const andamentoISO: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 18, label: 'ANDAMENTO' },
  { value: 19, label: 'CONCLUÍDO' },
  { value: 20, label: 'SOBRESTADO' },
  { value: 40, label: 'ANÁLISE DO CMT' }
]

export const andamentoIT: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 21, label: 'ANDAMENTO' },
  { value: 22, label: 'CONCLUÍDO' },
  { value: 23, label: 'SOBRESTADO' },
  { value: 41, label: 'ANÁLISE DO CMT' }
]

export const andamentoPAD: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 24, label: 'ANDAMENTO' },
  { value: 25, label: 'CONCLUIDO' },
  { value: 42, label: 'ANÁLISE DO CMT' }
]

export const andamentoSAI: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 26, label: 'ABERTURA' },
  { value: 27, label: 'ARQUIVO' },
  { value: 28, label: 'FATD' },
  { value: 29, label: 'SINDICÂNCIA' },
  { value: 30, label: 'IPM' },
  { value: 31, label: 'CD' },
  { value: 32, label: 'ADL' },
  { value: 33, label: 'CJ' }
]

export const getAndamento = (value: number | string) => {
  const andamento: Option[] = [
    { value: 0, label: 'SELECIONE' },
    { value: 1, label: 'ANDAMENTO' },
    { value: 2, label: 'CONCLUÍDO' },
    { value: 3, label: 'SOBRESTADO' },
    { value: 4, label: 'ANDAMENTO' },
    { value: 5, label: 'CONCLUÍDO' },
    { value: 6, label: 'ANDAMENTO' },
    { value: 7, label: 'CONCLUÍDO' },
    { value: 8, label: 'SOBRESTADO' },
    { value: 9, label: 'ANDAMENTO' },
    { value: 10, label: 'CONCLUÍDO' },
    { value: 11, label: 'SOBRESTADO' },
    { value: 12, label: 'ANDAMENTO' },
    { value: 13, label: 'CONCLUÍDO' },
    { value: 14, label: 'SOBRESTADO' },
    { value: 15, label: 'ANDAMENTO' },
    { value: 16, label: 'CONCLUÍDO' },
    { value: 17, label: 'SOBRESTADO' },
    { value: 18, label: 'ANDAMENTO' },
    { value: 19, label: 'CONCLUÍDO' },
    { value: 20, label: 'SOBRESTADO' },
    { value: 21, label: 'ANDAMENTO' },
    { value: 22, label: 'CONCLUÍDO' },
    { value: 23, label: 'SOBRESTADO' },
    { value: 41, label: 'ANÁLISE DO CMT' },
    { value: 24, label: 'ANDAMENTO' },
    { value: 25, label: 'CONCLUIDO' },
    { value: 42, label: 'ANÁLISE DO CMT' },
    { value: 26, label: 'ABERTURA' },
    { value: 27, label: 'ARQUIVO' },
    { value: 28, label: 'FATD' },
    { value: 29, label: 'SINDICÂNCIA' },
    { value: 30, label: 'IPM' },
    { value: 31, label: 'CD' },
    { value: 32, label: 'ADL' },
    { value: 33, label: 'CJ' },
    { value: 34, label: 'ANÁLISE DO CMT' },
    { value: 35, label: 'ANÁLISE DO CMT' },
    { value: 36, label: 'ANÁLISE DO CMT' },
    { value: 37, label: 'ANÁLISE DO CMT' },
    { value: 38, label: 'ANÁLISE DO CMT' },
    { value: 39, label: 'ANÁLISE DO CMT' },
    { value: 40, label: 'ANÁLISE DO CMT' }
  ]
  if (typeof (value) === 'number') {
    const ret = andamento.filter((and) => and.value === value)
    return ret.length ? ret[0] : 'Não encontrado'
  }
  const ret = andamento.filter(({ label }) => label === value)
  return ret.length ? ret[0] : 'Não encontrado'
}
