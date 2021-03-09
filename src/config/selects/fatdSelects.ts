import { Option } from './'

export const motivoFATD: Option[] = [
  { value: '', label: 'SELECIONE' },
  { value: 'Falta ao serviço: ', label: 'Falta ao serviço' },
  { value: 'Atraso aoserviço: ', label: 'Atraso ao serviço' },
  { value: 'Não prestar sinais derespeito: ', label: 'Não prestar sinais de respeito' },
  { value: 'Desrespeito a superior, par ousubordinado: ', label: 'Desrespeito a superior, par ou subordinado' },
  { value: 'Transgressões relativas ao atendimento deocorrência: ', label: 'Transgressões relativas ao atendimento de ocorrência' },
  { value: 'Sair de sua área de responsabilidade quando emserviço: ', label: 'Sair de sua área de responsabilidade quando em serviço' },
  { value: 'Realizar viagens/deslocamentos fora de seu município sem autorização docomando: ', label: 'Realizar viagens/deslocamentos fora de seu município sem autorização do comando' },
  { value: 'Falta de asseiopessoal: ', label: 'Falta de asseio pessoal' },
  { value: 'Portar-se de maneira inconveniente: ', label: 'Portar-se de maneira inconveniente' },
  { value: 'Extravio dematerial: ', label: 'Extravio de material' },
  { value: 'Falta emaudiência: ', label: 'Falta em audiência' },
  { value: 'DesidiaProcessual', label: 'Desidia Processual' },
  { value: 'Pratica CrimeMilitar: ', label: 'Pratica Crime Militar' },
  { value: 'Pratica CrimeComum: ', label: 'Pratica Crime Comum' },
  { value: 'Desrespeito a outrasnormativas: ', label: 'Desrespeito a outras normativas' },
  { value: 'Outro', label: 'Outro' }
]

export const resultadoFATD: Option[] = [
  { value: 1, label: 'Punido' },
  { value: 2, label: 'Absolvido' },
  { value: 23, label: 'Outra medida' },
  { value: 37, label: 'Anulado' }
]

export const situacaoFATD: Option[] = [
  { value: 'Em serviço ou atendimento de ocorrência', label: 'Em serviço ou atendimento de ocorrência' },
  { value: 'Fora de serviço ou outras circunstâncias', label: 'Fora de serviço ou outras circunstâncias' }
]
