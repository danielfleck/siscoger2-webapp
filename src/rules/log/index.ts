import { Rule, Rules } from '..'

export const logGroupRules: Rule = {
  permissions: [],
  roles: []
}

export const logRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-log', 'ver-log' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-log' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-log' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-log' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-log' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-log' */
    ],
    roles: []
  }
}

export * from './administracao'
export * from './apresentacao'
export * from './fdi'
export * from './policiais'
export * from './processos_procedimentos'
