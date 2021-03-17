import { RequiredFields, Rules } from '..'

export const encarregadoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-encarregado', 'ver-encarregado' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-encarregado' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-encarregado' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-encarregado' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-encarregado' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-encarregado' */
    ],
    roles: []
  }
}

export const encarregadoRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
