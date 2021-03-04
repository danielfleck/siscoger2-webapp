export type Option = {
  value: number| string;
  label: string;
}

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

export const situacaoOCOR: Option[] = [
  { value: 0, label: 'SELECIONE' },
  { value: 1, label: 'Em serviço ou atendimento de ocorrência' },
  { value: 2, label: 'Fora de serviço ou outras circunstâncias' }
]

export const tipoBoletim: Option[] = [
  { value: '', label: 'SELECIONE' },
  { value: 'BG', label: 'BG' },
  { value: 'BI', label: 'BI' },
  { value: 'BR', label: 'BR' }
]

export const tentado: Option[] = [
  { value: '', label: 'Selecione' },
  { value: 'Tentado', label: 'Tentado' },
  { value: 'Consumado', label: 'Consumado' }
]

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

export const situacaoServicoOuFora: Option[] = [
  { value: 1, label: 'Em serviço ou atendimento de Ocorrência' },
  { value: 2, label: 'Fora do Serviço ou outras circunstâncias' }
]

export const termoExclusao: Option[] = [
  { value: '', label: 'Escolha' },
  { value: 'Exclusao', label: 'Exclusão' },
  { value: 'Agregacao', label: 'Agregação' }
]

export const termoCaptura: Option[] = [
  { value: '', label: 'Escolha' },
  { value: 'Captura', label: 'Captura' },
  { value: 'Apresentacao espontanea', label: 'Apresentaçãoo Espontânea' }
]

export const pericia: Option[] = [
  { value: '', label: 'Escolha' },
  { value: 'Sim', label: 'Sim' },
  { value: 'Nao', label: 'Não' }
]

export const termoInclusao: Option[] = [
  { value: '', label: 'Escolha' },
  { value: 'Inclusao', label: 'Inclusão' },
  { value: 'Reversao', label: 'Reversão' }
]

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

export const presoTipo: Option[] = [
  { value: 1, label: 'FLAGRANTE' },
  { value: 2, label: 'PREVENTIVA' },
  { value: 3, label: 'TEMPORÁRIA' },
  { value: 4, label: 'CONDENAÇÃO' },
  { value: 5, label: 'MENAGEM' },
  { value: 6, label: 'DESERCAO' }
]

export const origemRestricao: Option[] = [
  { value: '', label: 'Selecione' },
  { value: 'Laudo medico', label: 'Laudo m&eacute;dico' },
  { value: 'Disciplinar/Criminal', label: 'Sit. Disciplinar/Criminal' },
  { value: 'Disparo', label: 'Disparo Imprudente/Negligente' },
  { value: 'Sob efeito alcool', label: 'Porte sob efeito de alcool ou outra subst.' },
  { value: 'Condenacao Punicao Disciplinar', label: 'Condenaçãoo ou Punição Disciplinar' },
  { value: 'Inapto Psicologico', label: 'Inapto Avaliaçãoo Psicológica' }
]

export const respCivil: Option[] = [
  { value: 0, label: 'Indefinida Culpa' },
  { value: 1, label: 'Civil' },
  { value: 2, label: 'Militar' },
  { value: 3, label: 'Ente estatal' },
  { value: 4, label: 'PJ - Direito privado' },
  { value: 5, label: 'Terceiro' }
]

export const tipoPenalNovo: Option[] = [
  { value: '', label: 'Selecione' },
  { value: 'Homicidio', label: 'Homicidio' },
  { value: 'Lesao Corporal', label: 'Lesao Corporal' },
  { value: 'Extravio de arma', label: 'Extravio de arma' },
  { value: 'Furto de arma', label: 'Furto de arma' },
  { value: 'Roubo de arma', label: 'Roubo de arma' },
  { value: 'Extravio de municao', label: 'Extravio de Munição' },
  { value: 'Concussao', label: 'Concussão (Art. 305)' },
  { value: 'Peculato', label: 'Peculato (Art. 303)' },
  { value: 'Corrupcao passiva', label: 'Corrupção passiva (Art. 308)' },
  { value: 'Contrabando ou descaminho', label: 'Contrabando ou descaminho' },
  { value: 'Uso de documento falso', label: 'Uso de documento falso (Art. 315)' },
  { value: 'Falsidade ideologica', label: 'Falsidade ideológica' },
  { value: 'Fuga de Preso', label: 'Fuga de preso' },
  { value: 'Prevaricacao', label: 'Prevaricação (Art. 319)' },
  { value: 'Violacao do sigilo funcional', label: 'Violação do sigilo funcional' },
  { value: 'Deserção', label: 'Deserção' },
  { value: 'Violencia contra superior', label: 'Violencia contra superior (Art. 157)' },
  { value: 'Violencia contra militar de sv', label: 'Violencia contra militar de serviço (Art. 158)' },
  { value: 'Desrespeito a superior', label: 'Desrespeito a superior (Art. 160)' },
  { value: 'Recusa de obediencia', label: 'Recusa de obediencia (Art. 163)' },
  { value: 'Abandono de posto', label: 'Abandono de posto (Art. 195)' },
  { value: 'Embriaguez em servico', label: 'Embriaguez em serviço (Art. 202)' },
  { value: 'Desacato a superior', label: 'Desacato a superior (Art. 298)' },
  { value: 'Desacato a militar', label: 'Desacato a militar (Art. 299)' },
  { value: 'Furto', label: 'Furto' },
  { value: 'Roubo', label: 'Roubo' },
  { value: 'Dano', label: 'Dano' },
  { value: 'Instigamento ao suicidio', label: 'Instigamento ao suicidio' },
  { value: 'Abuso de autoridade', label: 'Abuso de autoridade' },
  { value: 'Auferir vantagem indevida', label: 'Auferir vantagem indevida' },
  { value: 'Outros', label: 'Outros (especificar)' }
]

export const envolvidoFatd: Option[] = [
  { value: 'Selecione', label: 'Selecione' },
  { value: 'Punido', label: 'Punido' },
  { value: 'Absolvido', label: 'Absolvido' },
  { value: 'Outra Medida', label: 'Outra Medida' },
  { value: 'Anulado', label: 'Anulado' }
]

export const envolvidoAdl: Option[] = [
  { value: 'Selecione', label: 'Selecione' },
  { value: 'Excluído', label: 'Excluído' },
  { value: 'Punido', label: 'Punido' },
  { value: 'Absolvido', label: 'Absolvido' },
  { value: 'Perda objetovalue: ', label: 'Perda objeto' },
  { value: 'Prescricao', label: 'Prescricao' },
  { value: 'Reintegrado/Reinseridovalue: ', label: 'Reintegrado/Reinserido' }
]

export const envolvidoSai: Option[] = [
  { value: 'Selecione', label: 'Selecione' },
  { value: 'Denunciado', label: 'Denunciado' },
  { value: 'Elogiado', label: 'Elogiado' },
  { value: 'Envolvido', label: 'Envolvido' },
  { value: 'Testemunha', label: 'Testemunha' },
  { value: 'Vítima', label: 'Vítima' }
]

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

export const motivoSobrestamento: Option[] = [
  { value: 'Férias Acusado', label: 'Férias Acusado' },
  { value: 'Férias Comissão', label: 'Férias Comissão' },
  { value: 'Incidente de Insanidade', label: 'Incidente de Insanidade' },
  { value: 'Substituição', label: 'Substituição' },
  { value: 'Laudos/Perícia', label: 'Laudos/Perícia' },
  { value: 'Deslinde Criminal', label: 'Deslinde Criminal' },
  { value: 'Outros', label: 'Outros' }
]

export const presotipo: Option[] = [
  { value: 1, label: 'Flagrante' },
  { value: 2, label: 'Preventiva' },
  { value: 3, label: 'Temporária' },
  { value: 4, label: 'Condenação' },
  { value: 5, label: 'Menagem' },
  { value: 6, label: 'Deserção' }
]

export const prorogacao: Option[] = [
  { value: 0, label: 'Não' },
  { value: 1, label: 'Sim' }
]

export const postograd: Option[] = [
  { value: 'SD2C', label: 'SD2C' },
  { value: 'SD1C', label: 'SD1C' },
  { value: 'CABO', label: 'CABO' },
  { value: '3SGT', label: '3SGT' },
  { value: '2SGT', label: '2SGT' },
  { value: '1SGT', label: '1SGT' },
  { value: 'SUBTEN', label: 'SUBTEN' },
  { value: 'ALUNO1A', label: 'ALUNO1A' },
  { value: 'ALUNO2A', label: 'ALUNO2A' },
  { value: 'ALUNO3A', label: 'ALUNO3A' },
  { value: 'ALUNO', label: 'ALUNO' },
  { value: 'ASPOF', label: 'ASPOF' },
  { value: '2TEN', label: '2TEN' },
  { value: '1TEN', label: '1TEN' },
  { value: 'CAP', label: 'CAP' },
  { value: 'MAJ', label: 'MAJ' },
  { value: 'TENCEL', label: 'TENCEL' },
  { value: 'CEL', label: 'CEL' },
  { value: 'CELAGREG', label: 'CELAGREG' }
]

export const classPMPR: Option[] = [
  { value: 'PM', label: 'PM' },
  { value: 'BM', label: 'BM' }
]

export const group: Option[] = [
  { value: 'QOPM', label: 'QOPM' },
  { value: 'QOBM', label: 'QOBM' },
  { value: 'QPM', label: 'QPM' },
  { value: 'QBM', label: 'QBM' }
]

export const subgroup: Option[] = [
  { value: '-', label: '-' },
  { value: '1-0', label: '1-0' },
  { value: '2-0', label: '2-0' }
]

export const procedTipos: Option[] = [
  { value: 'ipm', label: 'IPM' },
  { value: 'sindicancia', label: 'SINDICÂNCIA' },
  { value: 'cd', label: 'CD' },
  { value: 'cj', label: 'CJ' },
  { value: 'apfdc', label: 'APFDC' },
  { value: 'apfdm', label: 'APFDM' },
  { value: 'fatd', label: 'FATD' },
  { value: 'iso', label: 'ISO' },
  { value: 'desercao', label: 'DESERÇÃO' },
  { value: 'it', label: 'IT' },
  { value: 'adl', label: 'ADL' },
  { value: 'pad', label: 'PAD' },
  { value: 'sai', label: 'SAI' },
  { value: 'proc_outros', label: 'PROC. OUTROS' }
]

export const motivoAberturaSindicancia: Option[] = [
  { value: 'Concessão de medalhas', label: 'Concessão de medalhas' },
  { value: 'Ato de bravura', label: 'Ato de bravura' },
  { value: 'Atestado de origem', label: 'Atestado de origem' },
  { value: 'Apuração de infração', label: 'Apuração de infração' },
  { value: 'Outro', label: 'Outro' }
]
