import { RequiredFields, Rules } from '..'

export const postosgraduacaoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-postosgraduacao', 'ver-postosgraduacao' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-postosgraduacao' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-postosgraduacao' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-postosgraduacao' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-postosgraduacao' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-postosgraduacao' */
    ],
    roles: []
  }
}

export const postosgraduacaoRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
