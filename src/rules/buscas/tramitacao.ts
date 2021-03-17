import { RequiredFields, Rules } from '..'

export const buscatramitacaoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-buscatramitacao', 'ver-buscatramitacao' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-buscatramitacao' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-buscatramitacao' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-buscatramitacao' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-buscatramitacao' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-buscatramitacao' */
    ],
    roles: []
  }
}

export const buscatramitacaoRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
