import { RequiredFields, Rules } from '..'

export const correicaoordinariaRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-correicaoordinaria', 'ver-correicaoordinaria' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-correicaoordinaria' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-correicaoordinaria' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-correicaoordinaria' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-correicaoordinaria' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-correicaoordinaria' */
    ],
    roles: []
  }
}

export const correicaoordinariaRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
