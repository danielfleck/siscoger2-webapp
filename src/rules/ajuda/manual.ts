import { RequiredFields, Rules } from '..'

export const manualRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-manual', 'ver-manual' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-manual' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-manual' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-manual' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-manual' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-manual' */
    ],
    roles: []
  }
}

export const manualRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
