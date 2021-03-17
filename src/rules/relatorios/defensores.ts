import { RequiredFields, Rules } from '..'

export const defensorRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-defensor', 'ver-defensor' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-defensor' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-defensor' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-defensor' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-defensor' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-defensor' */
    ],
    roles: []
  }
}

export const defensorRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
