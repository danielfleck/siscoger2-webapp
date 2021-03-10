interface Rule {
  permissions: string[]
  roles: string[]
}
export interface Rules {
  toShow: Rule
  toCreate: Rule
  toEdit: Rule
  toDelete: Rule
  toRestore: Rule
  toForceDelete: Rule
}

export interface RequiredFields {
  toCreate: string[]
  toEdit: string[]
  toFinalize: string[]
}

export * from './adl'
export * from './andamento'
export * from './andamentocoger'
export * from './apfd'
export * from './arquivo'
export * from './auth'
export * from './cd'
export * from './cj'
export * from './comportamento'
export * from './decorrenciaconselho'
export * from './denunciacivil'
export * from './desercao'
export * from './envolvido'
export * from './exclusaojudicial'
export * from './falecimento'
export * from './fatd'
export * from './feriado'
export * from './gradacao'
export * from './ipm'
export * from './iso'
export * from './ligacao'
export * from './log'
export * from './motivoconselho'
export * from './movimento'
export * from './ofendido'
export * from './pad'
export * from './pendencias'
export * from './permission'
export * from './pj'
export * from './posto'
export * from './preso'
export * from './presotipo'
export * from './procoutros'
export * from './recurso'
export * from './reintegrado'
export * from './respcivil'
export * from './restricao'
export * from './resultado'
export * from './role'
export * from './sai'
export * from './saidiligencias'
export * from './sindicancia'
export * from './situacao'
export * from './sobrestamento'
export * from './upload'
export * from './user'

