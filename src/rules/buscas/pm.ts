import { RequiredFields, Rules } from '..'

export const buscapmRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-buscapm', 'ver-buscapm' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-buscapm' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-buscapm' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-buscapm' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-buscapm' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-buscapm' */
    ],
    roles: []
  }
}

export const buscapmRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
