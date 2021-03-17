import { RequiredFields, Rules } from '..'

export const prioritarioRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-prioritario', 'ver-prioritario' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-prioritario' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-prioritario' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-prioritario' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-prioritario' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-prioritario' */
    ],
    roles: []
  }
}

export const prioritarioRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
