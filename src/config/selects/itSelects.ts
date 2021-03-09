import { Option } from './'

export const causaAcidente: Option[] = [
  { value: 1, label: 'Pessoais' },
  { value: 2, label: 'Técnicas' },
  { value: 3, label: 'Caso fortuito' },
  { value: 4, label: 'Força Maior' },
  { value: 5, label: 'Indefinido' }
]

export const objetoProcedimento: Option[] = [
  { value: 1, label: 'arma' },
  { value: 2, label: 'munição' },
  { value: 3, label: 'outros' },
  { value: 4, label: 'semovente' },
  { value: 5, label: 'viatura' }
]

export const tipoAcidente: Option[] = [
  { value: '', label: 'Selecione' },
  { value: 'nao identificado', label: 'Não identificado' },
  { value: 'abalroamento lateral', label: 'Abalroamento lateral' },
  { value: 'abalroamento transversal', label: 'Abalroamento transversal' },
  { value: 'atropelamento', label: 'Atropelamento' },
  { value: 'atropelamento de animal', label: 'Atropelamento de animal' },
  { value: 'capotamento', label: 'Capotamento' },
  { value: 'colisao frontal', label: 'Colisão frontal' },
  { value: 'colisao traseira', label: 'Colisão traseira' },
  { value: 'choque', label: 'Choque' },
  { value: 'engavetamento', label: 'Engavetamento' },
  { value: 'incendio', label: 'Incêndio' },
  { value: 'queda de passageiro', label: 'Queda de passageiro' },
  { value: 'queda de objeto', label: 'Queda de objeto' },
  { value: 'queda de moto', label: 'Queda de moto' },
  { value: 'queda de veiculo', label: 'Queda de veículo' },
  { value: 'tombamento', label: 'Tombamento' },
  { value: 'acidente complexo', label: 'Acidente complexo' }
]

export const avarias: Option[] = [
  { value: '', label: 'Selecione' },
  { value: 'Pequena Montavalue: ', label: 'Pequena Monta' },
  { value: 'Media Montavalue: ', label: 'Media Monta' },
  { value: 'Grande Montavalue: ', label: 'Grande Monta' }
]

export const situacaoviatura: Option[] = [
  { value: 'nao informado', label: 'Não informado' },
  { value: 'consertada comonus', label: 'Consertada com ônus' },
  { value: 'consertada semonus', label: 'Consertada sem ônus' },
  { value: 'inservivel', label: 'Inservível' },
  { value: 'aguardaconserto', label: 'Aguarda conserto' }
]
