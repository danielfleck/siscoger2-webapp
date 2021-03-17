import { RequiredFields, Rules } from '..'

export const correicaoextraordinariaRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-correicaoextraordinaria', 'ver-correicaoextraordinaria' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-correicaoextraordinaria' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-correicaoextraordinaria' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-correicaoextraordinaria' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-correicaoextraordinaria' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-correicaoextraordinaria' */
    ],
    roles: []
  }
}

export const correicaoextraordinariaRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
