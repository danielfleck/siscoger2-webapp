<template>
  <q-card class="col-12" flat>
    <q-card-section class="row">
      <div class="q-pa-xs col-12">{{ label }}</div>
      <div class="q-pa-xs col-3">
        <InputSelect label="Local atual" v-model="register.local_atual" :options="locais" ref="local_atual" required/>
      </div>
      <div class="q-pa-xs col-3">
        <InputText mask="###" label="Número" v-model="register.numero" ref="numero" required/>
      </div>
      <div class="q-pa-xs col-3">
        <InputSelect label="Letra" v-model="register.letra" :options="letras" ref="letra" required/>
      </div>
      <div class="q-pa-xs col-3">
        <InputText label="Observações" v-model="register.obs"/>
      </div>
      <div class="q-pa-xs col-12">
        <q-btn 
          color="primary" 
          @click="register.id ? update(register) : create()" 
          :label="register.id ? 'Editar' : 'Inserir'" 
          class="full-width" 
          :icon="register.id ? 'fa fa-pen' : 'fa fa-plus'"
          />
      </div> 
    </q-card-section>
    <q-card-section v-if="registers.length" class="row">
      <q-list bordered separator class="q-pa-xs col-12">
        <q-item clickable v-ripple >
          <q-item-section>Data</q-item-section>
          <q-item-section>Local</q-item-section>
          <q-item-section>N°/Letra</q-item-section>
          <q-item-section>Obs</q-item-section>
          <q-item-section>RG</q-item-section>
          <q-item-section>Ações</q-item-section>
        </q-item>
        <q-item v-ripple v-for="(arquivo, index) in registers" :key="index">
          <q-item-section>{{arquivo.arquivo_data}}</q-item-section>
          <q-item-section>{{arquivo.local_atual}}</q-item-section>
          <q-item-section>{{arquivo.numero}}/{{arquivo.letra | toUppercase}}</q-item-section>
          <q-item-section>{{arquivo.obs}}</q-item-section>
          <q-item-section>{{arquivo.rg}}</q-item-section>
          <q-item-section>
            <q-btn-group spread>
              <BtnStack label="Editar" icon="fa fa-pen" @click="edit(arquivo)"/>
              <BtnStack label="Apagar" icon="fa fa-trash" @click="remove(arquivo)"/>
            </q-btn-group>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from '@vue/composition-api'
import { confirmMsg } from 'src/libs/dialog'
import { validate } from 'src/libs/validator'
import { toUppercase } from 'src/filters'

import { randomIntFromInterval, getCurrentDate } from 'src/utils/mockValues'

import InputText from 'components/form/InputText.vue'
import InputSelect from 'components/form/InputSelect.vue'
import InputDate from 'components/form/InputDate.vue'
import BtnStack from 'components/form/BtnStack.vue'

export interface Register{
  id: number
  procedimento: string
  id_proc: string
  sjd_ref: string
  sjd_ref_ano: string
  arquivo_data: string
  rg: string
  nome: string
  cdopm: string
  local_atual: string
  numero: string
  letra: string
  obs: string
}

const cleanRegister = {
  id: 0,
  procedimento: '',
  id_proc: '',
  sjd_ref: '',
  sjd_ref_ano: '',
  arquivo_data: '',
  rg: '',
  nome: '',
  cdopm: '',
  local_atual: '',
  numero: '',
  letra: '',
  obs: '',
}

const fields = ['motivo','motivo_outros','inicio_data','doc_controle_inicio','publicacao_inicio']
const locais = ['Arquivo COGER','Arquivo Geral(PMPR)','Cautela (Saída)']
const letras = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','aa','ab','ac','ad','ae','af','ag','ah','ai','aj','ak','al','am','an','ao','ap','aq','ar','as','at','au','av','aw','ax','ay','az','ba','bb','bc','bd','be','bf','bg','bh','bi','bj','bk','bl','bm','bn','bo','bp','bq','br','bs','bt','bu','bv','bw','bx','by','bz','ca','cb','cc','cd','ce','cf','cg','ch','ci','cj','ck','cl','cm','cn','co','cp','cq','cr','cs','ct','cu','cv','cw','cx','cy','cz','da','db','dc','dd','de','df','dg','dh','di','dj','dk','dl','dm','dn','do','dp','dq','dr','ds','dt','du','dv','dw','dx','dy','dz','ea','eb','ec','ed','ee','ef','eg','eh','ei','ej','ek','el','em','en','eo','ep','eq','er','es','et','eu','ev','ew','ex','ey','ez','fa','fb','fc','fd','fe','ff','fg','fh','fi','fj','fk','fl','fm','fn','fo','fp','fq','fr','fs','ft','fu','fv','fw','fx','fy','fz','ga','gb','gc','gd','ge','gf','gg','gh','gi','gj','gk','gl','gm','gn','go','gp','gq','gr','gs','gt','gu','gv','gw','gx','gy','gz','ha','hb','hc','hd','he','hf','hg','hh','hi','hj','hk','hl','hm','hn','ho','hp','hq','hr','hs','ht','hu','hv','hw','hx','hy','hz','ia','ib','ic','id','ie','if','ig','ih','ii','ij','ik','il','im','in','io','ip','iq','ir','is','it','iu','iv','iw','ix','iy','iz','ja','jb','jc','jd','je','jf','jg','jh','ji','jj','jk','jl','jm','jn','jo','jp','jq','jr','js','jt','ju','jv','jw','jx','jy','jz','ka','kb','kc','kd','ke','kf','kg','kh','ki','kj','kk','kl','km','kn','ko','kp','kq','kr','ks','kt','ku','kv','kw','kx','ky','kz','la','lb','lc','ld','le','lf','lg','lh','li','lj','lk','ll','lm','ln','lo','lp','lq','lr','ls','lt','lu','lv','lw','lx','ly','lz','ma','mb','mc','md','me','mf','mg','mh','mi','mj','mk','ml','mm','mn','mo','mp','mq','mr','ms','mt','mu','mv','mw','mx','my','mz','na','nb','nc','nd','ne','nf','ng','nh','ni','nj','nk','nl','nm','nn','no','np','nq','nr','ns','nt','nu','nv','nw','nx','ny','nz','oa','ob','oc','od','oe','of','og','oh','oi','oj','ok','ol','om','on','oo','op','oq','or','os','ot','ou','ov','ow','ox','oy','oz','pa','pb','pc','pd','pe','pf','pg','ph','pi','pj','pk','pl','pm','pn','po','pp','pq','pr','ps','pt','pu','pv','pw','px','py','pz','qa','qb','qc','qd','qe','qf','qg','qh','qi','qj','qk','ql','qm','qn','qo','qp','qq','qr','qs','qt','qu','qv','qw','qx','qy','qz','ra','rb','rc','rd','re','rf','rg','rh','ri','rj','rk','rl','rm','rn','ro','rp','rq','rr','rs','rt','ru','rv','rw','rx','ry','rz','sa','sb','sc','sd','se','sf','sg','sh','si','sj','sk','sl','sm','sn','so','sp','sq','sr','ss','st','su','sv','sw','sx','sy','sz','ta','tb','tc','td','te','tf','tg','th','ti','tj','tk','tl','tm','tn','to','tp','tq','tr','ts','tt','tu','tv','tw','tx','ty','tz','ua','ub','uc','ud','ue','uf','ug','uh','ui','uj','uk','ul','um','un','uo','up','uq','ur','us','ut','uu','uv','uw','ux','uy','uz','va','vb','vc','vd','ve','vf','vg','vh','vi','vj','vk','vl','vm','vn','vo','vp','vq','vr','vs','vt','vu','vv','vw','vx','vy','vz','wa','wb','wc','wd','we','wf','wg','wh','wi','wj','wk','wl','wm','wn','wo','wp','wq','wr','ws','wt','wu','wv','ww','wx','wy','wz','xa','xb','xc','xd','xe','xf','xg','xh','xi','xj','xk','xl','xm','xn','xo','xp','xq','xr','xs','xt','xu','xv','xw','xx','xy','xz','ya','yb','yc','yd','ye','yf','yg','yh','yi','yj','yk','yl','ym','yn','yo','yp','yq','yr','ys','yt','yu','yv','yw','yx','yy','yz','za','zb','zc','zd','ze','zf','zg','zh','zi','zj','zk','zl','zm','zn','zo','zp','zq','zr','zs','zt','zu','zv','zw','zx','zy','zz']

export default defineComponent({
  name: 'Arquivo',
  components: {InputText, InputSelect, InputDate, BtnStack},
  props: {
    label: {
      type: String,
      default: 'Sobrestamentos'
    },
    proc: {
      type: String,
    },
    id_proc: {
      type: Number,
      default: 0
    }
  },
  filters: { toUppercase },
  setup (props, { root, refs }) {
    const vars = reactive({
      register: {
        id: 0,
        procedimento: '',
        id_proc: '',
        sjd_ref: '',
        sjd_ref_ano: '',
        arquivo_data: '',
        rg: '',
        nome: '',
        cdopm: '',
        local_atual: '',
        numero: '',
        letra: '',
        obs: '',
      },
      registers: [] as Array<Register>,
      locais,
      letras
    })
    const functions = {
      create () {
        if (validate(refs, fields)) {
          vars.register.id = randomIntFromInterval(1, 999)
          vars.register.arquivo_data = getCurrentDate()
          vars.registers.push(vars.register)
          vars.register = cleanRegister
        }
      },
      edit (register: Register) {
        vars.register = register
      },
      update (register: Register) {
        const found = vars.registers.findIndex(f => f.id === register.id)
        vars.registers[found] = register
        vars.register = cleanRegister
      },
      remove (register: Register) {
        const found = vars.registers.findIndex(f => f.id === register.id)
        root.$q.dialog(confirmMsg).onOk(() => {
          vars.registers.splice(found, 1)
        })
      },
    }

    return {
      ...toRefs(vars),
      ...functions,
    }
  }
})
</script>
