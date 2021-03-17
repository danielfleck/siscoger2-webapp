import { RequiredFields, Rules } from '..'

export const biRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-bi', 'ver-bi' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-bi' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-bi' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-bi' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-bi' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-bi' */
    ],
    roles: []
  }
}

export const biRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
