import { RequiredFields, Rules } from '..'

export const modificarsenhaRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-modificarsenha', 'ver-modificarsenha' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-modificarsenha' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-modificarsenha' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-modificarsenha' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-modificarsenha' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-modificarsenha' */
    ],
    roles: []
  }
}

export const modificarsenhaRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
