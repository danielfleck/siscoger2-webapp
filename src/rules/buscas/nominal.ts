import { RequiredFields, Rules } from '..'

export const buscanominalRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-buscanominal', 'ver-buscanominal' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-buscanominal' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-buscanominal' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-buscanominal' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-buscanominal' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-buscanominal' */
    ],
    roles: []
  }
}

export const buscanominalRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
