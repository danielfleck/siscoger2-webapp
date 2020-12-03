<template>
  <q-card class="q-pa-none col-12" flat>
    <q-card-section class="row">
      <div class="q-pa-xs col-12">{{ label }}</div>
      <div class="q-pa-xs col-3">
        <q-file
          hide-bottom-space
          :dense="denseVal"
          :value="files"
          @input="updateFiles"
          label="Selecione o arquivo"
          outlined
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
          <template v-slot:file="{ index, file }">
            <q-chip
              v-if="file"
              class="full-width q-my-xs"
              :removable="true"
              square
              @remove="cancelFile(index)"
            >
              <q-linear-progress
                class="absolute-full full-height"
                :value="uploadProgress[index].percent"
                :color="uploadProgress[index].color"
                track-color="grey-2"
              />
              <q-avatar><q-icon :name="uploadProgress[index].icon || 'insert_drive_file'" /></q-avatar>
              <div class="ellipsis relative-position">{{ file.name }}</div>
              <q-tooltip>{{ file.name }}</q-tooltip>
            </q-chip>
          </template>
        </q-file>
      </div>
      <div class="q-pa-xs col-3">
        <InputDate v-model="register.data_arquivo" label="Data do documento" defaultToday/>
      </div>
      <div class="q-pa-xs col-3">
        <InputText label="Observações" v-model="register.obs" />
      </div>
      <div class="q-pa-xs col-3">
        <q-btn-group spread>
          <BtnStack label="Cancelar" icon="fa fa-minus" @click="cancelFile"/>
          <BtnStack label="Upload" icon="cloud_upload" :disable="!canUpload" :loading="isUploading" @click="upload"/>
        </q-btn-group>
      </div>
    </q-card-section>
    <q-card-section v-if="registers.length" class="row">
      <q-list bordered separator class="q-pa-xs col-12">
        <q-item clickable v-ripple >
          <q-item-section>Nome</q-item-section>
          <q-item-section>Tipo</q-item-section>
          <q-item-section>Tamanho</q-item-section>
          <q-item-section>Data</q-item-section>
          <q-item-section>Observações</q-item-section>
          <q-item-section>Ações</q-item-section>
        </q-item>
        <q-item v-ripple v-for="(arquivo, index) in registers" :key="index">
          <q-item-section>{{arquivo.name}}</q-item-section>
          <q-item-section>{{arquivo.mime | typeFile}}</q-item-section>
          <q-item-section>{{arquivo.size | toMB}}</q-item-section>
          <q-item-section>{{arquivo.data_arquivo | dateBr}}</q-item-section>
          <q-item-section>{{arquivo.obs | hasObs}}</q-item-section>
          <q-item-section>
            <q-btn-group spread>
              <BtnStack label="Apagar" icon="fa fa-trash" @click="remove(arquivo)"/>
            </q-btn-group>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { defineComponent, reactive, toRefs, computed } from '@vue/composition-api'
import InputDate from 'components/form/InputDate.vue'
import InputText from 'components/form/InputText.vue'
import BtnStack from 'components/form/BtnStack.vue'
import { getDense } from 'src/store/utils'
import { deleteData, post } from 'src/libs/api'
import { changeDate } from 'src/filters'
import { errorNotify } from 'src/libs/notify'
import { confirmMsg } from 'src/libs/dialog'

export interface Register{
  _id?: number
  name?: string
  mime?: string
  size?: number
  campo: string
  rg?: string
  id_proc?: string
  proc: string
  obs: string
  data_arquivo: string
}
const moduleName = 'uploads'
export default defineComponent({
  name: 'FileUpload',
  components: { InputDate, InputText, BtnStack },
  props: {
    label: {
      type: String,
      required: true
    },

    data: {
      type: Object,
      required: true
    },
    limitMB: {
      type: Number,
      default: 5
    },
    extensions: {
      type: Array,
      default: ['pdf']
    }
  },
  filters: {
    dateBr (date: string) {
      return changeDate(date, 'pt-br')
    },
    typeFile (type: string) {
      if ('/'.indexOf(type)) {
        return type.split('/')[1]
      }
      return '-'
    },
    toMB (value: number) {
      if (!value) return '-'
      value = value / 1048576
      return `${value.toFixed(2)} MB`
    },
    hasObs (value: any) {
      if (!value) return 'Não há'
      return value
    }
  },
  setup (props, { root }) {
    const vars = reactive({
      files: [] as File[],
      uploadProgress: [] as any[],
      uploading: null as any,
      register: {
        campo: props.data.campo,
        name: '',
        mime: '',
        size: 0,
        rg: '',
        id_proc: props.data.id_proc,
        proc: props.data.proc,
        obs: '',
        data_arquivo: new Date().toISOString()
      } as Register,
      registers: [] as Register[]
    })
    const computeds = {
      denseVal: computed(() => getDense(root)),
      isUploading: computed(() => vars.uploading !== null),
      canUpload: computed(() => vars.files.length)
    }
    const functions = {
      cancelFile (index: number) {
        vars.files.splice(index, 1)
        vars.uploadProgress[index] = {
          ...vars.uploadProgress[index],
          percent: 0,
          error: true,
          color: 'orange-2'
        }
      },
      cleanRegister () {
        return {
          campo: props.data.campo,
          name: '',
          mime: '',
          size: 0,
          rg: '',
          id_proc: props.data.id_proc,
          proc: props.data.proc,
          obs: '',
          data_arquivo: new Date().toISOString()
        }
      },
      remove (register: Register): void {
        const found = vars.registers.findIndex(f => f._id === register._id)
        root.$q.dialog(confirmMsg).onOk(async () => {
          const id = register._id || 0
          await deleteData(`${moduleName}/${id}`)
          vars.registers.splice(found, 1)
        })
      },
      getIcon (file: any) {
        if (file?.type.indexOf('video/') === 0) return 'movie'
        if (file?.type.indexOf('image/') === 0) return 'photo'
        if (file?.type.indexOf('audio/') === 0) return 'audiotrack'
        return 'insert_drive_file'
      },
      updateFiles (files: File) {
        const errors = this.verifyErrorsInFile(files)
        if (errors) {
          errors.map(e => (errorNotify(e)))
          return
        }
        const { name, size, type } = files

        vars.register.name = name
        vars.register.size = size
        vars.register.mime = type
        vars.files.push(files)
        vars.uploadProgress = vars.files.map(file => ({
          error: false,
          color: 'green-2',
          percent: 0,
          icon: this.getIcon(file)
        }))
      },
      async upload () {
        const formData = new FormData()
        formData.append('file', vars.files[0])
        const data:any = { ...props.data, ...vars.register }
        Object.keys(data).forEach(key => {
          const val = data && data[key] ? data[key] : ''
          formData.append(key, val)
        })
        this.showProgress()
        const response = await post(moduleName, formData, { complete: true, file: true, debug: true })
        if (response.returntype === 'success') {
          vars.register = this.cleanRegister()
          vars.files = []
          vars.uploadProgress = []
          await this.loadData()
        }
      },
      async loadData () {
        const response = await post(`${moduleName}/search`, props.data, { silent: true, debug: true })
        vars.registers = response
      },

      showProgress () {
        clearTimeout(vars.uploading)
        const allDone = vars.uploadProgress.every(progress => progress.percent === 1)

        vars.uploadProgress = vars.uploadProgress.map(progress => ({
          ...progress,
          error: false,
          color: 'green-2',
          percent: allDone === true ? 0 : progress.percent
        }))

        this.__updateUploadProgress()
      },

      __updateUploadProgress () {
        let done = true

        vars.uploadProgress = vars.uploadProgress.map(progress => {
          if (progress.percent === 1 || progress.error === true) {
            return progress
          }

          const percent = Math.min(1, Number(progress.percent) + Math.random() / 10)
          const error = percent < 1 && Math.random() > 0.95

          if (error === false && percent < 1 && done === true) {
            done = false
          }

          return {
            ...progress,
            error,
            color: error === true ? 'red-2' : 'green-2',
            percent
          }
        })

        // eslint-disable-next-line @typescript-eslint/unbound-method
        vars.uploading = done !== true ? setTimeout(this.__updateUploadProgress, 300) : null
      },
      verifyErrorsInFile (file: File) {
        const errors = []
        const filetype = file.type.split('/')[1]
        if (!props.extensions.includes(filetype)) {
          errors.push(`Extenção inválida! deve ser: ${props.extensions.join(', ')}`)
        }

        const fileSize = file.size
        const maxSize = 1048576 * props.limitMB
        if (fileSize > maxSize) {
          errors.push(`Tamanho excedido! deve ser menor que ${props.limitMB}MB `)
        }

        if (errors.length) return errors
        return false
      },
      onBeforeUnmount () {
        clearTimeout(vars.uploading)
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    functions.loadData()
    return {
      ...toRefs(vars),
      ...computeds,
      ...functions
    }
  }
})
</script>
