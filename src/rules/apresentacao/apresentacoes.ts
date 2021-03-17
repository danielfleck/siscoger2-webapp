import { RequiredFields, Rules } from '..'

export const apresentacaoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-apresentacao', 'ver-apresentacao' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-apresentacao' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-apresentacao' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-apresentacao' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-apresentacao' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-apresentacao' */
    ],
    roles: []
  }
}

export const apresentacaoRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
