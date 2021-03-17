import { RequiredFields, Rules } from '..'

export const processoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-processo', 'ver-processo' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-processo' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-processo' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-processo' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-processo' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-processo' */
    ],
    roles: []
  }
}

export const processoRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
