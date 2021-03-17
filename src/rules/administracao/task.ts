import { RequiredFields, Rules } from '..'

export const taskRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-task', 'ver-task' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-task' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-task' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-task' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-task' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-task' */
    ],
    roles: []
  }
}

export const taskRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
