import { RequiredFields, Rules } from '..'

export const buscacogerRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-buscacoger', 'ver-buscacoger' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-buscacoger' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-buscacoger' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-buscacoger' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-buscacoger' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-buscacoger' */
    ],
    roles: []
  }
}

export const buscacogerRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
