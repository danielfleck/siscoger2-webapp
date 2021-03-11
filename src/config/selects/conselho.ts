import { Option } from './'

export const decorrenciaConselho: Option[] = [
  { value: 1, label: 'Condenação' },
  { value: 2, label: 'Homicídio' },
  { value: 3, label: 'Concussão' },
  { value: 4, label: 'Corrupção passiva' },
  { value: 5, label: 'Peculato' },
  { value: 6, label: 'Roubo' },
  { value: 7, label: 'Prevaricação' },
  { value: 8, label: 'Mau comportamento' },
  { value: 9, label: 'Vínculo empregatício' },
  { value: 10, label: 'Estelionato' },
  { value: 11, label: 'Deserção' },
  { value: 12, label: 'Crimes contra a dignidade sexual' },
  { value: 13, label: 'Outros (especifique)' },
  { value: 14, label: 'Auferir vantagem indevida' },
  { value: 15, label: 'Tortura' },
  { value: 16, label: 'Abuso de autoridade' },
  { value: 17, label: 'Contrabando/Descaminho' },
  { value: 18, label: 'Uso/Posse Substância Entorpecente' },
  { value: 19, label: 'Furto' },
  { value: 20, label: 'Associação e/ou Tráfico de Entorpecentes' },
  { value: 21, label: 'Omissão ou não preencher requisitos no Edital de Inclusão' },
  { value: 22, label: 'Crimes de Falsidade Documental / Fé Pública' },
  { value: 23, label: 'Associação Criminosa' },
  { value: 24, label: 'Porte Ilegal Arma de Fogo' },
  { value: 25, label: 'Disparo de Arma de Fogo' }
]

export const motivoConselho: Option[] = [
  { value: 1, label: 'Mau comportamento, nova falta grave' },
  { value: 2, label: 'Acusado oficialmente de' },
  { value: 3, label: 'Afastado preventivamente por se tornar incompatível com o cargo ou função' },
  { value: 4, label: 'Incapacidade para o exercício da atribuição institucional' },
  { value: 5, label: 'Condenado por crime doloso - pena privativa de liberdade superior a 2 anos' },
  { value: 6, label: 'Reprovado em estágio probatório ou avaliação de desempenho' },
  { value: 7, label: 'Considerado inapto no período de formação' },
  { value: 8, label: 'Integrar partido político ou associação contrária à lei' }
]

export const parecerComissao: Option[] = [
  { value: 'Opta pela exclusao', label: 'Opta pela exclusao' },
  { value: 'Opta pela permanencia', label: 'Opta pela permanencia' },
  { value: 'Opta pela reforma', label: 'Opta pela reforma' }
]

export const parecerCmtgeral: Option[] = [
  { value: 'Opta pela exclusao', label: 'Opta pela exclusao' },
  { value: 'Opta pela permanencia', label: 'Opta pela permanencia' },
  { value: 'Opta pela reforma', label: 'Opta pela reforma' }
]
