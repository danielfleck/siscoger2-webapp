export interface Rule {
  permissions: string[];
  roles: string[];
}

export interface Rules {
  toShow: Rule;
  toCreate: Rule;
  toEdit: Rule;
  toDelete: Rule;
  toRestore: Rule;
  toForceDelete: Rule;
}

export interface RequiredFields {
  toCreate: string[];
  toEdit: string[];
  toFinalize: string[];
}

export * from './administracao'
export * from './ajuda'
export * from './apresentacao'
export * from './bi'
export * from './buscas'
export * from './correicoes'
export * from './log'
export * from './policiais'
export * from './processos_procedimentos'
export * from './relatorios'
