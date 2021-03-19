interface Terms {
  badge?: string
  label: string
}

const terms: Terms[] = [
  { label: 'DECLARO estar ciente da habilitação que me foi conferida, da responsabilidade de obedecer às disposições referentes ao controle de acesso aos sistemas informatizados da Polícia Militar do Estado do Paraná e de estar sujeito às penalidades cabíveis pela não-observância dos compromissos assumidos.' },
  { label: 'Comprometo-me a:' },
  { badge: 'a)', label: 'zelar pelo sigilo absoluto de minha senha;' },
  { badge: 'b)', label: 'zelar pela integridade e confidencialidade das informações inseridas ou consultadas;' },
  { badge: 'c)', label: 'acessar os sistemas informatizados da SJD, somente por necessidade de serviço ou por determinação expressa de superior hierárquico, mantendo registro de tal fato;' },
  { badge: 'd)', label: 'não revelar fato ou informação de qualquer natureza de que tenha conhecimento por força de minhas atribuições, salvo em decorrência de decisão competente na esfera administrativa ou judicial, bem como de autoridade superior;' },
  { badge: 'e)', label: 'manter a absoluta cautela quando da exibição de dados em tela, impressora ou, ainda, na gravação em meios eletrônicos, a fim de evitar que deles venham a tomar ciência pessoas não autorizadas;' },
  { badge: 'f)', label: 'não me ausentar do terminal sem encerrar a sessão de uso do sistema, garantindo assim a impossibilidade de acesso indevido por pessoas não autorizadas;' },
  { badge: 'g)', label: 'solicitar o imediato cancelamento da chave e senha quando não for mais utilizada, por ter sido transferido da seção de Justiça e Disciplina para outro local de trabalho ou reserva;' },
  { badge: 'h)', label: 'reportar imediatamente à chefia ou ao Administrador do Sistema, em caso de violação, acidental ou não, da sua senha, providenciando a sua substituição;' },
  { badge: 'i)', label: 'de maneira alguma ou sob qualquer pretexto, tentar descobrir senhas de outras pessoas;' },
  { badge: 'j)', label: 'somente utilizar o acesso para os fins designados e para os quais estiver devidamente autorizado, em razão das suas funções;' },
  { badge: 'k)', label: 'responder, em todas as instâncias, pelas conseqüências das ações ou omissões de minha parte que possam por em risco ou comprometer a exclusividade de conhecimento da minha senha ou das transações as quais esteja habilitado; e' },
  { badge: 'l)', label: 'observar o disposto no Decreto Federal nº. 4.553/2002, em especial o contido no artigo 37, § 1º.' },
  { label: '' },
  { label: 'Declaro ainda, estar ciente das determinações acima, compreendendo que quaisquer descumprimentos dessas regras podem implicar na aplicação das sanções disciplinares cabíveis e que o sistema manterá histórico de todos os acessos e consultas realizadas, permitindo auditoria sobre a chave utilizada.' },
  { label: 'A inexatidão das declarações desta comunicação ou a violação destas implicará nas sanções previstas no Código Penal Militar.' }
]

export default Object.freeze(terms)
