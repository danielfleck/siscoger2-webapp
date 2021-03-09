import { Option } from './'

export const andamentoCogerFATD: Option[] = [
  { value: 14, label: 'DECIDIDO CG' },
  { value: 15, label: 'RECONSIDERAÇÃO DE ATO' },
  { value: 16, label: 'RECURSO DISCIPLINAR' },
  { value: 17, label: 'ARQUIVADO' },
  { value: 49, label: 'COGER' },
  { value: 61, label: 'COMISSAO PROCESSANTE' },
  { value: 71, label: 'VAJME' }
]

export const andamentoCogerIPM: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 18, label: 'DECIDIDO CG' },
  { value: 19, label: 'VAJME' },
  { value: 20, label: 'ARQUIVADO VAJME' },
  { value: 45, label: 'JUSTICA COMUM' },
  { value: 46, label: 'ARQUIVADO/JUST. COMUM' },
  { value: 47, label: 'COGER' }
]

export const andamentoCogerSindicancia: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 8, label: 'DECIDIDA CG' },
  { value: 9, label: 'VAJME' },
  { value: 10, label: 'VAJME/PGE' },
  { value: 11, label: 'ARQUIVADA' },
  { value: 12, label: 'ARQUIVADA VAJME' },
  { value: 48, label: 'COGER' },
  { value: 57, label: 'JUSTICA COMUM' },
  { value: 58, label: 'ARQ. JUST. COMUM' },
  { value: 68, label: 'CPP' },
  { value: 69, label: 'CPO' },
  { value: 70, label: 'COMISSAO MERITO' },
  { value: 99, label: 'CANCELADA' }
]

export const andamentoCogerCD: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 21, label: 'DECIDIDO' },
  { value: 22, label: 'RECONSIDERAÇÃO DE ATO' },
  { value: 23, label: 'TJPR' },
  { value: 24, label: 'TJPR/RECURSO DISC.' },
  { value: 25, label: 'GOVERNADOR P/ DECRETO' },
  { value: 26, label: 'ARQUIVADO' },
  { value: 37, label: 'RECURSO DISC.' },
  { value: 54, label: 'COGER' },
  { value: 62, label: 'COM. PROC. PERMANENTE' },
  { value: 66, label: 'COM. PROCESSANTE' }
]

export const andamentoCogerCJ: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 27, label: 'RECONSIDERAÇÃO DE ATO' },
  { value: 28, label: 'TJPR' },
  { value: 29, label: 'TJPR/RECURSO DISC.' },
  { value: 30, label: 'GOVERNADOR PARA DECRETO' },
  { value: 31, label: 'ARQUIVADO' },
  { value: 53, label: 'COGER' },
  { value: 63, label: 'COM. PROC. PERMANENTE' },
  { value: 67, label: 'COM. PROCESSANTE' }
]

export const andamentoCogerADL: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 1, label: 'DECIDIDO' },
  { value: 2, label: 'RECONSIDERAÇÃO DE ATO' },
  { value: 3, label: 'TJPR' },
  { value: 4, label: 'TJPR/RECURSO DISC.' },
  { value: 5, label: 'GOVERNADOR P/ DECRETO' },
  { value: 6, label: 'ARQUIVADO' },
  { value: 38, label: 'RECURSO DISC.' },
  { value: 55, label: 'COGER' },
  { value: 64, label: 'COM. PROC. PERMANENTE' },
  { value: 65, label: 'COM. PROCESSANTE' }
]

export const andamentoCogerISO: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 39, label: 'SOLUCIONADO' },
  { value: 40, label: 'ARQUIVADO' },
  { value: 56, label: 'COGER' },
  { value: 76, label: 'JUNTA MÉDICA' }
]

export const andamentoCogerIT: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 32, label: 'DECIDIGO CG' },
  { value: 33, label: 'VAJME' },
  { value: 34, label: 'VAJME/PGE' },
  { value: 35, label: 'PGE' },
  { value: 36, label: 'ARQUIVADO' },
  { value: 52, label: 'COGER' },
  { value: 77, label: 'SEÇÃO IT' },
  { value: 78, label: 'DER' },
  { value: 79, label: 'SESP' },
  { value: 93, label: 'DILIGÊNCIAS' }
]

export const andamentoCogerPAD: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 72, label: 'COGER' },
  { value: 73, label: 'CEF' },
  { value: 74, label: 'ARQUIVO' },
  { value: 75, label: 'OUTRO' }
]

export const andamentoCogerSAI: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 80, label: 'ANÁLISE' },
  { value: 81, label: 'ARQUIVO' },
  { value: 82, label: 'CAI' },
  { value: 83, label: 'CHEFE SAI' },
  { value: 84, label: 'SUB CHEFE SAI' },
  { value: 85, label: 'SARGENTEAÇÃO' },
  { value: 86, label: 'OPERAÇÕES' },
  { value: 87, label: 'PESQUISA' },
  { value: 88, label: 'UNIDADE' },
  { value: 89, label: 'Poder Judiciário' },
  { value: 90, label: 'Ministério Público' },
  { value: 91, label: 'Delegacia de Polícia' },
  { value: 92, label: 'Inteligência' }
]

export const andamentoCogerDesercao: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 41, label: 'VAJME' },
  { value: 42, label: 'ARQUIVADO VAJME' },
  { value: 50, label: 'COGER' }
]

export const andamentoCogerAPFD: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 43, label: 'VAJME' },
  { value: 44, label: 'ARQUIVADO VAJME' },
  { value: 51, label: 'COGER' },
  { value: 59, label: 'JUSTICA COMUM' },
  { value: 60, label: 'ARQUIVADO/JUST. COMUM' }
]
