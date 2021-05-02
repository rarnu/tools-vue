<template>
  <div class="effect-dialog">
    <el-dialog title="效果编辑" :modelValue="modelValue" width="800px" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">

      <el-form ref="form" :model="form" label-width="auto" size="small">
        <el-form-item label="中文效果">
          <el-input type="textarea" :autosize="{minRows: 5}" v-model="form.text" placeholder="请输入中文效果"></el-input>
        </el-form-item>
        <el-form-item label="效果翻译">
          <el-button type="primary" @click="translate">翻译 (将中文效果翻译为日文)</el-button>
        </el-form-item>
        <el-form-item label="日文效果">
          <el-input type="textarea" :autosize="{minRows: 5}" v-model="form.textjp" placeholder="请输入日文效果"></el-input>
        </el-form-item>
        <el-form-item label="首行效果">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-select v-model="form.firstLineType" placeholder="请选择首行的类型" style="width: 100%;" clearable @change="firstLineTypeChange">
                <el-option v-for="item in firstLineTypes" :value="item"></el-option>
              </el-select>
            </el-col>
            <el-col :span="13">
              <el-select v-model="form.firstLineValue" placeholder="请选择首行的值" style="width: 100%;" clearable>
                <el-option v-for="item in firstLineValues" :value="item"></el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" @click="writeFirstLine">写入</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button plain size="medium" @click="closeDialog">关闭</el-button>
        <el-button type="primary" size="medium" @click="remoteKanaEffect">注音(偏重卡片效果)</el-button>
        <el-button type="primary" size="medium" @click="remoteKanaNormal">注音(偏重日语语句)</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
const effectList = require('@/assets/json/effect-text.json');
const cardTypeList = require('@/assets/json/cardtype-text.json');

export default {
  name: "EffectDialog",
  props: ['modelValue'],
  data() {
    return {
      effectKeys: [],
      effectSequences: [],
      firstLineTypes: [],
      firstLineValues: [],
      form: {
        text: '',
        textjp: '',
        effectKey: '',
        effectjp: '',
        firstLineType: '',
        firstLineValue: ''
      }
    };
  },
  created() {
    try {
      ipcRenderer.on('translate-reply', (event, args) => {
        if (!args.texts) {
          this.$message.warning('翻译失败，请稍后重试');
          return;
        }
        let str = '';
        args.texts.forEach((item) => {
          str += item + '\n';
        });
        this.form.textjp += str;
      });
    } catch (err) {

    }
    try {
      ipcRenderer.on('remote-effect-kana-reply', (event, args) => {
        this.form.textjp = args.text;
      });
    } catch (e) {

    }
  },
  mounted() {
    this.effectKeys = Object.keys(effectList);
    this.firstLineTypes = Object.keys(cardTypeList);
  },
  methods: {
    remoteKanaEffect() {
      this.effectKanjiKanaAPI(this.form.textjp).then(kk => {
        if (kk) {
          this.form.textjp = kk;
        } else {
          this.form.textjp = this.kanjiToKana(this.form.textjp);
        }
      });
    },
    remoteKanaNormal() {
      this.normalKanjiKanaAPI(this.form.textjp).then(kk => {
        if (kk) {
          this.form.textjp = kk;
        } else {
          this.form.textjp = this.kanjiToKana(this.form.textjp);
        }
      });
    },
    writeEffect() {
      const text = effectList[this.form.effectKey][this.form.effectjp];
      this.form.textjp += text;
    },
    writeFirstLine() {
      const text = cardTypeList[this.form.firstLineType][this.form.firstLineValue];
      this.form.textjp += text;
    },
    effectKeyChange() {
      this.effectSequences = Object.keys(effectList[this.form.effectKey]);
    },
    firstLineTypeChange() {
      this.firstLineValues = Object.keys(cardTypeList[this.form.firstLineType]);
    },
    closeDialog() {
      this.resetForm('text');
      this.$emit('update:modelValue', false);
    },
    translate() {
      if (this.form.text.trim() === '') return;
      try {
        ipcRenderer.send('translate', {text: this.form.text});
      } catch (e) {
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.effect-dialog {

}
</style>