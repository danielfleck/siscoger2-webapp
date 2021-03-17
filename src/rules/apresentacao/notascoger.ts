import { RequiredFields, Rules } from '..'

export const notacogerRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-notacoger', 'ver-notacoger' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-notacoger' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-notacoger' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-notacoger' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-notacoger' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-notacoger' */
    ],
    roles: []
  }
}

export const notacogerRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
