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
        <InputDate v-model="register.data_arquivo" label="Data do documento"/>
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
  </q-card>
</template>

<script lang="ts">
/* eslint-disable camelcase */
import { defineComponent, reactive, toRefs, computed } from '@vue/composition-api'
import InputDate from 'components/form/InputDate.vue'
import InputText from 'components/form/InputText.vue'
import BtnStack from 'components/form/BtnStack.vue'

export default defineComponent({
  name: 'FileUpload',
  components: { InputDate, InputText, BtnStack },
  props: {
    label: {
      type: String,
      required: true
    }
  },
  setup (props, { root, refs }) {
    const vars = reactive({
      files: [] as File[],
      uploadProgress: [] as any[],
      uploading: null as any,
      register: {
        data_arquivo: '',
        obs: ''
      }
    })
    const computeds = {
      denseVal: computed(() => root.$store.state.configs.dense),
      isUploading: computed(() => vars.uploading !== null),
      canUpload: computed(() => vars.files.length)
    }
    const functions = {
      cancelFile (index: any) {
        vars.files.splice(index, 1)
        vars.uploadProgress[index] = {
          ...vars.uploadProgress[index],
          percent: 0,
          error: true,
          color: 'orange-2'
        }
      },
      getIcon (file: any) {
        if (file?.type.indexOf('video/') === 0) return 'movie'
        if (file?.type.indexOf('image/') === 0) return 'photo'
        if (file?.type.indexOf('audio/') === 0) return 'audiotrack'
        return 'insert_drive_file'
      },
      updateFiles (files: File) {
        vars.files.push(files)
        vars.uploadProgress = vars.files.map(file => ({
          error: false,
          color: 'green-2',
          percent: 0,
          icon: this.getIcon(file)
        }))
      },
      upload () {
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

          const percent = Math.min(1, progress.percent + Math.random() / 10)
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

        vars.uploading = done !== true ? setTimeout(this.__updateUploadProgress, 300) : null
      },
      onBeforeUnmount () {
        clearTimeout(vars.uploading)
      }
    }
    return {
      ...toRefs(vars),
      ...computeds,
      ...functions
    }
  }
})
</script>
