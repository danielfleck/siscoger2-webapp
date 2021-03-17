import { RequiredFields, Rules } from '..'

export const localapresentacaoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-localapresentacao', 'ver-localapresentacao' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-localapresentacao' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-localapresentacao' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-localapresentacao' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-localapresentacao' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-localapresentacao' */
    ],
    roles: []
  }
}

export const localapresentacaoRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
